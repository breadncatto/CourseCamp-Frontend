import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Profile.css';
import localAvatar from '../../assets/avatar.png';

const StudentProfile = () => {
  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar role="student" activePage="profile" />
        <main className="main-content">
          <Header /> 
          <div className="content-body">
            <div className="header-section">
              <h1>My Profile</h1>
            </div>
            <div className="profile-container">
              <div className="profile-sidebar">
                <div className="profile-avatar-card">
                  <img src={localAvatar} alt="Profile" className="profile-img-large" />
                  <h3 className="profile-name">Jurica Koletic</h3>
                  <p className="profile-role">Student</p>
                </div>
              </div>
              <div className="profile-content">
                <div className="section-header">Account Information</div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" defaultValue="Jurica" />
                  </div>
                  <div className="form-group col-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" defaultValue="Koletic" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" defaultValue="+1800-1892" />
                  </div>
                  <div className="form-group col-3">
                    <label>Email Address</label>
                    <input type="email" className="form-control" defaultValue="juricakoletic@gmail.com" />
                  </div>
                </div>
                <div className="update-btn-container">
                  <button className="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StudentProfile;