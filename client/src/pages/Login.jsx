/* NOTE */
//TODO
/*
  - Sau này thêm nghiệp vụ xử lý đăng nhập, lưu trữ token.
  - Thêm đăng nhập OAuth vào dự án hệ thống.
 */
import React from "react";
import "./Login.css";
import logo from "../assets/logo-coursecamp.png";
import googleLogo from "../assets/logo-google.png"; // ✅ thêm dòng này
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        {/* Logo */}
        <div className="login-logo">
          <img src={logo} alt="CourseCamp" className="logo-img" />
        </div>

        {/* Heading */}
        <h2 className="login-title">Log in to CourseCamp</h2>

        {/* Form */}
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="btn-email">
            Log in with your Email
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Login */}
        <button className="btn-google">
          <img
            src={googleLogo}   // ✅ dùng ảnh trong dự án của bạn
            alt="Google"
            className="google-icon"
          />
          Log in with Google
        </button>

        {/* Links */}
        <div className="login-links">
          <p>
            Don't have an account? <Link to="/register"><a href="Register.jsx">Register</a></Link>
          </p>
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
