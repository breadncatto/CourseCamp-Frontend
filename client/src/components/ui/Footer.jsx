import React from "react";
import logoCourseCamp from "../../assets/logo-coursecamp.png";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <img src={logoCourseCamp} alt="logo" className="logo" />
        <p>Keep learning, stay curious. CourseCamp © 2025.</p>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>

        {/* ❗ Đã sửa: không lồng <a> bên trong Link */}
        <Link to="/">Home</Link>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </div>

      <div className="footer-col">
        <h4>Subscribe</h4>
        <input type="email" placeholder="Enter your email" />
        <button className="btn primary">Subscribe</button>
      </div>
    </footer>
  );
}

export default Footer;
