# news_routes.py
import os
from datetime import datetime
from typing import List
import requests

from fastapi import APIRouter, BackgroundTasks
from pymongo import MongoClient, ASCENDING

# ---------- CONFIG ----------
MONGO_URI = os.getenv("MONGO_URI") or "your-mongodb-uri-here"
DB_NAME = os.getenv("DB_NAME") or "nexusshield"
RSS_FEEDS = [
    "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews",
    "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml",
    "https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/",
]
MAX_DESCRIPTION_LEN = 200   # keep description one line (trim)
# ----------------------------

router = APIRouter()

# MongoDB client + collection
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
news_col = db["news"]

# Ensure unique index on link to prevent duplicates (safe to call multiple times)
try:
    news_col.create_index([("link", ASCENDING)], unique=True, background=True)
except Exception:
    # ignore index errors at import time
    pass


def _clean_item(item: dict) -> dict:
    """Return a lightweight doc with only required fields."""
    title = (item.get("title") or "").strip()
    link = item.get("link")
    description = item.get("description") or ""
    # remove HTML and collapse into one short line
    import re
    desc_text = re.sub(r"<[^>]+>", "", description).replace("\n", " ").strip()
    if len(desc_text) > MAX_DESCRIPTION_LEN:
        desc_text = desc_text[:MAX_DESCRIPTION_LEN].rsplit(" ", 1)[0] + "..."
    pubDate = item.get("pubDate") or None

    return {
        "title": title,
        "link": link,
        "description": desc_text,
        "pubDate": pubDate,
        "created_at": datetime.utcnow(),
    }


def fetch_and_store_new_news():
    """Synchronous fetch from feeds and insert only new links (unique index blocks duplicates)."""
    for feed in RSS_FEEDS:
        try:
            resp = requests.get(feed, timeout=12)
            data = resp.json()
            items = data.get("items", []) if isinstance(data, dict) else []
            for item in items:
                link = item.get("link")
                title = item.get("title", "").strip()
                if not link or not title:
                    continue
                doc = _clean_item(item)
                # insert only if link not present; unique index makes this safe
                try:
                    news_col.insert_one(doc)
                except Exception:
                    # duplicate key or other insert issue -> ignore
                    pass
        except Exception as e:
            print(f"[news_routes] error fetching {feed}: {e}")


@router.get("/api/news")
def get_news(background_tasks: BackgroundTasks, limit: int = 50):
    """
    Return latest news (title, link, description, pubDate).
    Also start a background task to fetch & store any new news (non-blocking).
    """
    # schedule background fetch (non-blocking)
    background_tasks.add_task(fetch_and_store_new_news)

    # query DB: return lightweight docs, most recent first
    docs = list(
        news_col.find(
            {}, {"_id": 0, "title": 1, "link": 1, "description": 1, "pubDate": 1}
        )
        .sort("created_at", -1)
        .limit(int(limit))
    )
    return {"news": docs}
