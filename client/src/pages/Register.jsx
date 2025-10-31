//TODO
/*
  - Cập nhật thêm state để chứa thông tin từ form gửi về cho server
  - Thêm state để kiểm tra lại password.
  - Đăng ký thành công sẽ tạo token, chuyển hướng sang trang homepage
*/
import React from "react";
import "./Register.css";
import logo from "../assets/logo-coursecamp.png";
import googleLogo from "../assets/logo-google.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-box">
        {/* Logo */}
        <div className="register-logo">
          <img src={logo} alt="CourseCamp" className="logo-img" />
        </div>

        {/* Heading */}
        <h2 className="register-title">Create an account</h2>

        {/* Form */}
        <form className="register-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm your password" required />
          <input type="tel" placeholder="Phone Number" required />
          <button type="submit" className="btn-email">
            Create account
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Login */}
        <button className="btn-google">
          <img src={googleLogo} alt="Google" className="google-icon" />
          Continue with Google
        </button>

        {/* Links */}
        <div className="register-links">
          <p>
            Already have an account? <Link to="/login"><a>Log in</a></Link>
          </p>

          <p className="terms">
            By registering, you agree to our{" "}
            <a href="#">terms of service</a> and{" "}
            <a href="#">privacy notice</a>.
          </p>

          <p className="terms small">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#">Privacy Policy</a> and{" "}
            <a href="#">Terms of Service</a> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
