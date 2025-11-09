import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
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
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
              <a key={idx} href="#" aria-label="social link" className="social-link">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
             <li><Link to="/users">Users</Link></li>
              <li><Link to="/nudges">Nudges</Link></li>
                      <li><Link to="/reports">Reports</Link></li>
             <li><Link to="/riskreport">Riskreport</Link></li>
     
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li>📞 +92 300 1234567</li>
            <li>📧 support@nexusshield.com</li>
            <li>🏢 Karachi, Pakistan</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>Stay updated with the latest cybersecurity alerts.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <ul>
          <li><Link to="#">Privacy Policy</Link></li>
          <li><Link to="#">Terms</Link></li>
          <li><Link to="#">Support</Link></li>
        </ul>
        <p>© {new Date().getFullYear()} Nexus Shield. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
