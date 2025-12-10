import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import localAvatar from '../assets/avatar.png';
import logo from '../assets/logo.png'; 

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isStudent = location.pathname.includes('/student');
  const isAdmin = location.pathname.includes('/admin');

  let roleLabel = 'Tutor';
  if (isStudent) roleLabel = 'Student';
  if (isAdmin) roleLabel = 'Admin';

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
            <span className="user-name">Jurica Koletic</span>
            <span className="user-role">{roleLabel}</span>
          </div>
          <img src={localAvatar} alt="Avatar" className="user-avatar" />
          <svg className="arrow-down" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-item" onClick={() => handleNavigation('/student/profile')}>Profile</div>
              <div className="dropdown-item" onClick={() => handleNavigation('/student/setting')}>Settings</div>
              
              {}
              {isStudent && (
                <div className="dropdown-item" onClick={() => handleNavigation('/student/become-tutor')}>
                  Become a Tutor
                </div>
              )}

              <div className="dropdown-divider"></div>
              
              {!isStudent && <div className="dropdown-item switch-role" onClick={() => handleNavigation('/student/profile')}>Switch to Student</div>}
              {(!location.pathname.includes('/tutor')) && <div className="dropdown-item switch-role" onClick={() => handleNavigation('/tutor/dashboard')}>Switch to Tutor</div>}
              {!isAdmin && <div className="dropdown-item switch-role" onClick={() => handleNavigation('/admin/approval')} style={{color: '#6f42c1'}}>Switch to Admin</div>}

              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={() => handleNavigation('/login')}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;