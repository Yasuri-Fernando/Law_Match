import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section about">
        <h3>About Us</h3>
        <p>At LawMatch, we are dedicated to simplifying the legal process through AI-powered solutions.</p>
      </div>
      <div className="footer-section explore">
        <h3>Explore</h3>
        <ul>
          <li>Law Insights</li>
          <li>Document Templates</li>
          <li>Announcements</li>
        </ul>
      </div>
      <div className="footer-section support">
        <h3>Support</h3>
        <ul>
          <li>FAQ</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-branding">
        <h3>LawMatch.</h3>
        <p>&copy; 2024 LawMatch Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;