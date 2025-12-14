import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
// Import logo của bạn (sửa lại đường dẫn nếu cần)
import logoCourseCamp from "../../assets/logo-coursecamp.png"; 
import { useAuth } from "../../context/AuthContext";
const GUEST_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const USER_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100";

function Header() {
    // const { isLoggedIn } = useAuth(); 
    // console.log(isLoggedIn);
    const { logout } = useAuth(); 
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  // --- STATE GIẢ LẬP (Sau này bạn sẽ thay bằng Context hoặc Redux) ---
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Thử đổi thành true để xem giao diện đã login
  const [showDropdown, setShowDropdown] = useState(false);

  // Xử lý click ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    logout();
    navigate("/"); // Quay về trang chủ
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Giả lập login thành công
    setShowDropdown(false);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* 1. Logo Section */}
        <Link to="/" className="header-logo-link">
          <img src={logoCourseCamp} alt="CourseCamp" className="header-logo" />
        </Link>

        {/* 2. Navigation Links */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/course-list" className="nav-link">Courses</Link>
          {isLoggedIn && (
            <Link to="/my-courses" className="nav-link">My Courses</Link>
          )}
        </nav>

        {/* 3. User Avatar & Dropdown */}
        <div className="header-actions" ref={dropdownRef}>
          <div 
            className="user-avatar-container" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src={isLoggedIn ? USER_AVATAR : GUEST_AVATAR} 
              alt="User Avatar" 
              className="user-header-avatar" 
            />
          </div>

          {/* Logic hiển thị Dropdown Menu */}
          {showDropdown && (
            <div className="user-dropdown">
              {isLoggedIn ? (
                // --- Menu cho người dùng ĐÃ ĐĂNG NHẬP ---
                <>
                  <div className="dropdown-header">
                    <span className="user-name">Nguyen Van A</span>
                    <span className="user-email">student@coursecamp.com</span>
                  </div>
                  <button className="dropdown-item" onClick={() => navigate("/profile")}>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={() => navigate("/settings")}>
                    Settings
                  </button>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                // --- Menu cho người dùng CHƯA ĐĂNG NHẬP (Guest) ---
                <>
                  <div className="dropdown-header">
                    <span className="user-name">Welcome, Guest!</span>
                    <span className="user-email">Please login to continue</span>
                  </div>
                  <button className="dropdown-item" onClick={handleLogin}>
                    Login
                  </button>
                  <button className="dropdown-item" onClick={() => navigate("/register")}>
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;