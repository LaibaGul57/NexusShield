import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/OverviewScreen.css";

const OverviewScreen = () => {
  return (
    <div className="overview-page">
      <Header />

      <main className="overview-container">
        <h1 className="overview-title">Dashboard Overview</h1>

        <div className="overview-grid">
          <div className="overview-card">
            <div className="card-bar"></div>
            <div className="card-content">
              <h2 className="card-number">1,250</h2>
              <p className="card-label">Total Users</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-bar"></div>
            <div className="card-content">
              <h2 className="card-number">120</h2>
              <p className="card-label">Suspicious Links Detected</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-bar"></div>
            <div className="card-content">
              <h2 className="card-number">755</h2>
              <p className="card-label">Nudges Sent</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-bar"></div>
            <div className="card-content">
              <h2 className="card-number">65%</h2>
              <p className="card-label">Engagement Rate</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OverviewScreen;
