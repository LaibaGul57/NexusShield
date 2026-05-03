import express from "express";
import Parser from "rss-parser";

const router = express.Router();
const parser = new Parser();

router.get("/", async (req, res) => {
  try {
    const feed = await parser.parseURL("https://www.cisa.gov/news-events/cybersecurity-advisories/all.xml");

    const formatted = feed.items.slice(0, 10).map(item => ({
      title: item.title,
      link: item.link
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch advisories" });
  }
});

export default router;
