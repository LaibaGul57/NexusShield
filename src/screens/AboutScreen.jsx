import React from "react";
import Header from "../components/HeaderTwo";
import Footer from "../components/Footer";
import "../styles/AboutScreen.css";
import logo from "../assets/logo.png";
import missionImage from "../assets/mission.jpg";
import coreImage from "../assets/coreFunctions.png";

const AboutScreen = () => {
  return (
    <div className="about-page">
      <Header />

      {/* About Header */}
      <header className="about-header">
        <h1>About Us</h1>
        <p>Empowering users to practice safe digital habits through interactive cybersecurity education.</p>
      </header>

      {/* Introduction & Objectives */}
      <section className="about-section intro-section">
        <h2>Introduction & Objectives</h2>
        <p>
  <strong>Nexus Shield</strong> is an AI-powered Cyber Hygiene Assistant that guides users to safer online habits with real-time nudges and educational modules, focusing on behavior and awareness over just technical protection.
</p>
<ul>
  <li>Teach safe online habits with quizzes and scenarios.</li>
  <li>Give real-time alerts for awareness.</li>
  <li>Help users make smarter cybersecurity choices.</li>
</ul>

      </section>

      {/* Vision Section */}
      <section className="about-section vision-section">
        <h2>Our Vision</h2>
       <p>
  To build a safe and aware online community through education and smart guidance.
</p>

      </section>

      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <ul>
              <li>Provide real-time alerts and nudges for awareness</li>
              <li>Deliver accessible and engaging cybersecurity education through mobile applications.</li>
              <li>Encourage long-term digital hygiene habits among users.</li>
              </ul>
          </div>
          <div className="mission-image">
            <img src={missionImage} alt="Our Mission" />
          </div>
        </div>
      </section>

      {/* Core Functions Section */}
      <section className="about-section core-functions-section">
        <h2>Core Functions</h2>
        <div className="core-content">
          <div className="core-text">
            <ul>
              <li>Real time nudges for awareness</li>
              <li>Interactive learning modules and quizzes</li>
              <li>Behavioral tracking for user awareness improvement</li>
              <li>Encouragement of safe online habits and responsible digital behavior</li>
            </ul>
          </div>
          <div className="core-image">
            <img src={coreImage} alt="Core Functions" />
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="about-section logo-section">
        <h2>Our Logo</h2>
        <img src={logo} alt="Nexus Shield Logo" className="about-logo" />
     <p>
  The Nexus Shield logo represents safety, awareness, and guiding users to secure online habits.
</p>

      </section>

      <Footer />
    </div>
  );
};

export default AboutScreen;
