//TODO
/*
  - Cập nhật thêm state để chứa thông tin từ form gửi về cho server
  - Thêm state để kiểm tra lại password.
  - Đăng ký thành công sẽ tạo token, chuyển hướng sang trang homepage
*/
import React, { useState } from "react";
import "./Register.css";
import logo from "../../assets/logo-coursecamp.png";
import googleLogo from "../../assets/logo-google.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); 
  // State form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  const [errors, setErrors] = useState({});

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải từ 8 ký tự trở lên';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrors({});

    const payload = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role === "instructor" ? "instructor" : "student"
    };

    const result = await register(payload);

    if (result.success) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate('/login');
    } else {
      setErrors({ api: result.message });
    }
  };

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
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={formData.email} onChange={handleChange} name="email" required />
          {errors.email && <span className="error-text">{errors.email}</span>}
          <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} name="password" required />
          {errors.password && <span className="error-text">{errors.password}</span>}
          <input type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" required />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

          <div className="role-select-container">
            <label htmlFor="role" className="role-label">
              Select Role:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="register-input-select"
            >
              <option value="student">Student (Học viên)</option>
              <option value="instructor">Instructor (Giảng viên)</option>
            </select>
          </div>

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
            Already have an account? <Link to="/login">Log in</Link>
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
