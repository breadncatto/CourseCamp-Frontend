/* NOTE */
//TODO
/*
  - Sau này thêm nghiệp vụ xử lý đăng nhập, lưu trữ token.
  - Thêm đăng nhập OAuth vào dự án hệ thống.
 */
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "../../assets/logo-coursecamp.png";
import googleLogo from "../../assets/logo-google.png"; // ✅ thêm dòng này
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth(); 
  const navigate = useNavigate();

  // --- HÀM XỬ LÝ ĐĂNG NHẬP ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang

    try {
      const result = await login(email, password); // Nếu thành công thì token đã được useAuth lưu rồi

      // Chuyển hướng người dùng đến các trang tương ứng với chức năng của họ
      // const role = response.data.meta.role;
      const role = result.role;
      if (result) {
        alert("Đăng nhập thành công!");

        if(role === "instructor") {
          navigate("/tutor/dashboard");
        } else if(role === "student") {
          navigate("/");
        } else if(role === "admin") {
          navigate("/admin/approval")
        }
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert(error|| "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    window.location.href = "http://localhost:3000/api/auth/google";
    // Chuyển hướng về trang này, BE tự render trang google
  }
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
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <input
            type="password"
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="btn-email">
            Log in with your Email
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Login */}
        <button className="btn-google" onClick={handleGoogleLogin}>
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
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
