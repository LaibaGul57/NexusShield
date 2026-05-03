import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  // 🔗 Social Links Array - Yahan aap apne asal links dalein
  const socialLinks = [
    { Icon: FaFacebookF, url: "https://facebook.com/yourprofile", label: "Facebook" },
    { Icon: FaTwitter, url: "https://twitter.com/yourprofile", label: "Twitter" },
    { Icon: FaLinkedinIn, url: "https://pk.linkedin.com/in/maham-bibi-ab1901290", label: "LinkedIn" }, // 👈 Apna LinkedIn URL yahan dalein
    { Icon: FaInstagram, url: "https://instagram.com/yourprofile", label: "Instagram" },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Branding */}
        <div className="footer-column">
          <h3>Nexus Shield</h3>
          <p>
            Your trusted platform for monitoring, reporting, and cybersecurity alerts.
          </p>

          <div className="social-icons">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.url} 
                target="_blank"  // 🌐 New tab mein kholne ke liye
                rel="noopener noreferrer" // 🔒 Security ke liye zaroori ha
                aria-label={social.label} 
                className="social-link"
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li>📞 +92 300 1234567</li>
            <li>📧 support@nexusshield.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <ul className="footer-bottom-links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/support">Support</Link></li>
        </ul>
        <p>© {new Date().getFullYear()} Nexus Shield. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;