import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

// Hacker News RSS feed
const RSS_URL = "https://feeds.feedburner.com/TheHackersNews";

router.get("/latest", async (req, res) => {
  try {
    const response = await axios.get(RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9",
      },
    });

    const $ = cheerio.load(response.data, { xmlMode: true });
    const news = [];

    $("item").each((i, el) => {
      if (i >= 6) return; // ✅ Limit 6 news items
      const title = $(el).find("title").text().trim();
      const link = $(el).find("link").text().trim();
      const date = $(el).find("pubDate").text().trim();

      // Only include items with titles and links
      if (title && link) {
        news.push({
          title,
          link,
          date,
          source: "TheHackerNews.com",
        });
      }
    });

    return res.json({ news });
  } catch (err) {
    console.error("Cyber News Fetch Error:", err.message);
    return res.status(500).json({ error: "Unable to fetch cyber news" });
  }
});

export default router;
