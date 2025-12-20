import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import localAvatar from '../assets/avatar.png';
import logo from '../assets/logo.png'; 
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isStudent = user.role === "student";
  const isAdmin = user.role === "admin";

  let roleLabel = 'instructor';
  if (isStudent) roleLabel = 'student';
  if (isAdmin) roleLabel = 'admin';

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <header className="top-header">
      {}
      <div className="header-left">
        <img src={logo} alt="CourseCamp Logo" className="header-logo" />
      </div>

      {}
      <div className="header-right">
        <div className="header-actions">
          <button className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <button className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>

        <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="user-text">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role.toUpperCase()}</span>
          </div>
          <img src={localAvatar} alt="Avatar" className="user-avatar" />
          <svg className="arrow-down" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          
          {showDropdown && (
            <div className="user-dropdown">
              {user.role == "instructor" && 
              <>
                <div className="dropdown-item" onClick={() => handleNavigation('/tutor/profile')}>Profile</div>
                <div className="dropdown-item" onClick={() => handleNavigation('/tutor/add-course')}>Add Course</div>
                <div className="dropdown-item" onClick={() => handleNavigation('/tutor/dashboard')}>Dashboard</div>
              </>}
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={logout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;