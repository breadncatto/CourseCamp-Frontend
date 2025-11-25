import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          {}
          <img src={logo} alt="CourseCamp" className="footer-logo-img" />
          <p style={{ marginTop: '15px' }}>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="footer-section">
          <h4>Home</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Subscribe to our newsletter</h4>
          <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
        </div>
      </div>
      <div className="footer-bottom">
        Copyright 2025 © Course Camp. All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;