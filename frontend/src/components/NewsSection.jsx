import React, { useEffect, useState } from "react";
import "../styles/homeScreen.css"; 

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/cyber/latest");
        const data = await res.json();
        setNews(data.news || []);
      } catch (error) {
        console.log("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="news-container">
      <h2 className="news-heading">Latest News</h2>

      <div className="news-grid">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div className="news-card" key={index}>
              <div>
                <h4 className="news-title">{item.title}</h4>
                <p className="news-date">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <span className="news-source">{item.source}</span>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-btn"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading latest news...</p>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
