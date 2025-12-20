import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ activePage, role = 'tutor' }) => {
  const iconStyle = { marginRight: '12px', width: '18px', height: '18px', strokeWidth: '2.5' };

  return (
    <aside className="sidebar">
      {}
      
      <nav className="menu">
        {}
        
        {role === 'tutor' && (
          <>
            <Link to="/tutor/dashboard" style={{ textDecoration: 'none' }}><div className={`menu-item ${activePage === 'dashboard' ? 'active' : ''}`}>Dashboard</div></Link>
            <Link to="/tutor/add-course" style={{ textDecoration: 'none' }}><div className={`menu-item ${activePage === 'add-course' ? 'active' : ''}`}>Add course</div></Link>
            {/* <Link to="/tutor/my-courses" style={{ textDecoration: 'none' }}><div className={`menu-item ${activePage === 'my-course' ? 'active' : ''}`}>My course</div></Link> */}
            <Link to="/tutor/profile" style={{ textDecoration: 'none' }}><div className={`menu-item ${activePage === 'profile' ? 'active' : ''}`}>Profile</div></Link>
          </>
        )}

        {role === 'student' && (
          <>
             <Link to="/student/profile" style={{ textDecoration: 'none' }}>
              <div className={`menu-item ${activePage === 'profile' ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile
              </div>
            </Link>
            <Link to="/student/my-courses" style={{ textDecoration: 'none' }}>
              <div className={`menu-item ${activePage === 'courses' ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> My Courses
              </div>
            </Link>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link to="/admin/approval" style={{ textDecoration: 'none' }}>
              <div className={`menu-item ${activePage === 'approval' ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                Course Approval
              </div>
            </Link>
            {/* <Link to="/admin/tutor-requests" style={{ textDecoration: 'none' }}>
              <div className={`menu-item ${activePage === 'tutor-request' ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Tutor Requests
              </div>
            </Link> */}
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;