import express from "express";
import Parser from "rss-parser";

const router = express.Router();
const parser = new Parser();

router.get("/", async (req, res) => {
  try {
    const feed = await parser.parseURL("https://www.cisa.gov/cybersecurity-advisories/all.xml");

    const advisories = feed.items.slice(0, 10).map((item) => ({
      title: item.title,
      link: item.link
    }));

    return res.json({ source: "cisa.gov", advisories });
  } catch (err) {
    console.error("RSS Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch advisories" });
  }
});

export default router;
