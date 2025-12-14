import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Profile.css';
import localAvatar from '../../assets/avatar.png';
import { getStudentProfile } from '../../api/studentService';

const StudentProfile = () => {

  // Thêm api cập nhật profile về backend
  // Thêm api lấy profile về từ backend.
  const [profile, setProfile] = useState({
    fullName: "",
    role: "",
    number: "",
    email: "",
    dob: "",
    ranking: "",
    bio: "",
    skills: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getStudentProfile();

        if(response && response.meta) {
          const data = response.meta;

          console.log(data);

          setProfile(prev => ({
            ...prev,
            fullName: data.full_name || "Jurica Koletic",
            bio: data.bio || "",
            dob: data.dob || "",
            email: data.email || "",
            interests: data.email || "",
            ranking: data.ranking || "Beginner",
            skills: data.skills || "",
            role: data.role || "student",
            avatarUrl: data.avatar_url || localAvatar
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const [tempProfile, setTempProfile] = useState(profile);

  const handleUpdate = async () => {}
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
                  <img src={profile.avatarUrl} alt="Profile" className="profile-img-large" />
                  <h3 className="profile-name">{profile.fullName}</h3>
                  <p className="profile-role">Student</p>
                </div>
              </div>
              <div className="profile-content">
                <div className="section-header">Account Information</div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={profile.fullName}/>
                  </div>
                  <div className="form-group col-3">
                    <label>Birthday</label>
                    <input type="text" className="form-control" defaultValue={profile.dob} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" defaultValue="+1800-1892" />
                  </div>
                  <div className="form-group col-3">
                    <label>Email Address</label>
                    <input type="email" className="form-control" defaultValue={profile.email}/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Skills</label>
                    <input type="text" className="form-control" defaultValue={profile.skills}/>
                  </div>
                  <div className="form-group col-3">
                    <label>Ranking</label>
                    <input type="email" className="form-control" defaultValue={profile.ranking} />
                  </div>
                </div>
                <div className="update-btn-container">
                  <button className="btn btn-primary" onSubmit={handleUpdate}>Update</button>
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