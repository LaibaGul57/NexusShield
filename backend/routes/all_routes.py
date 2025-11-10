from fastapi import APIRouter
from pymongo import MongoClient
import feedparser
import re
import requests
router = APIRouter()

# ✅ MongoDB Connection
try:
    client = MongoClient(
        "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority"
    )
    db = client["nexusshield"]
    news_collection = db["news"]
    blogs_collection = db["blogs"]
    articles_collection = db["articles"]
except Exception as e:
    print("❌ MongoDB connection failed in all_routes.py:", e)

# ✅ Utility to store minimal data (title, description, link)
def save_to_db(collection, data):
    for item in data:
        if not collection.find_one({"link": item["link"]}):  # avoid duplicates
            collection.insert_one(item)

# ✅ Helper to clean description
def clean_text(text):
    return re.sub(r"<[^>]+>", "", text)[:150]
# ✅ RSS URLs
rss_urls = [
    "https://feeds.feedburner.com/TheHackersNews",
    "https://www.darkreading.com/rss.xml",
     "https://www.wired.com/feed/rss"
]
@router.get("/news")
def get_news():
    news_data = list(news_collection.find({}, {"_id": 0}))
    if not news_data:
        rss_urls = [
            "https://feeds.feedburner.com/TheHackersNews",
            "https://www.darkreading.com/rss.xml",
            "https://www.bleepingcomputer.com/feed/",
        ]
        for url in rss_urls:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                item = {
                    "title": entry.title,
                    "link": entry.link,
                    "description": clean_text(entry.get("summary", "")),
                    "pubDate": entry.get("published", ""),
                                    }
               



                news_data.append(item)
        save_to_db(news_collection, news_data)
    return {"news": news_data}  # ✅ Wrap in object

@router.get("/blogs")
def get_blogs():
    blogs_data = list(blogs_collection.find({}, {"_id": 0}))
    if not blogs_data:
        rss_urls = [
            "https://dev.to/feed",
            "https://blog.codinghorror.com/rss/",
        ]
        for url in rss_urls:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                item = {
                    "title": entry.title,
                    "link": entry.link,
                    "description": clean_text(entry.get("summary", "")),
                    "pubDate": entry.get("published", ""),
                }
                blogs_data.append(item)
        save_to_db(blogs_collection, blogs_data)
    return {"blogs": blogs_data}  # ✅ Wrap in object

# ✅ ARTICLES endpoint (no image)
@router.get("/articles")
def get_articles():
    # rss_urls = [
    #     "https://medium.com/feed/topic/technology",
    #     "https://www.wired.com/feed/rss",
    # ]
    rss_urls = [
    "https://feeds.feedburner.com/TheHackersNews",
    "https://www.darkreading.com/rss.xml",
    "https://www.bleepingcomputer.com/feed/"
]

   
    all_articles = []
    for url in rss_urls:
        feed = feedparser.parse(url)
        for entry in feed.entries:
            article_item = {
                "title": entry.title,
                "link": entry.link,
                "description": clean_text(entry.get("summary", "")),
                "pubDate": entry.get("published", ""),
            }
            all_articles.append(article_item)

    save_to_db(
        articles_collection,
        [{"title": a["title"], "link": a["link"], "description": a["description"]} for a in all_articles],
    )
    return {"articles": all_articles}
