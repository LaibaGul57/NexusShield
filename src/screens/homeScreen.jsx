import React from "react";
import "../styles/homeScreen.css";
// Sahi tarike se import karein
import HeaderTwo from "../components/HeaderTwo"; 
import Footer from "../components/Footer";
import AdvisoryBanner from "../components/AdvisoryBanner";
import NewsSection from "../components/NewsSection";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";

const HomeScreen = () => {
  const videos = [
    {
      title: "Beware of Cyber Attacks via WhatsApp & Suspicious Links",
      thumbnail: img1,
      link: "https://youtu.be/FZK24fHclgM",
    },
    {
      title: "Social Service Message for Parents",
      thumbnail: img2,
      link: "https://youtu.be/7U20GkqyTuU",
    },
    {
      title: "Guidelines on Password Protection",
      thumbnail: img3,
      link: "https://youtu.be/-yCKM4m5fdo",
    },
    {
      title: "Risks Associated with Online Games",
      thumbnail: img4,
      link: "https://youtu.be/hM5UP_2UdgA",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Yahan HeaderTwo use hua hai */}
      <HeaderTwo /> 
      <AdvisoryBanner />

      <main className="dashboard-main">
        <h2>Nexus Shield</h2>
        <p>
          <strong>NexusShield</strong> is a cybersecurity awareness platform
          designed to help users understand and prevent digital threats. We also
          offer a <strong>NexusShield Mobile App</strong> for users who prefer
          learning on the go.
          <a href="#" className="download-link"> Download Now </a>
        </p>

        {/* 🎥 Watch Now Section */}
        <section className="watch-section">
          <h3> Watch Now </h3>
          <div className="video-grid">
            {videos.map((video, index) => (
              <div className="video-card" key={index}>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                </a>
                <p>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d47a1", textDecoration: "none" }}
                  >
                    {video.title}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ CYBER NEWS Section */}
        <NewsSection />

      </main>

      <Footer />
    </div>
  );
};

export default HomeScreen;