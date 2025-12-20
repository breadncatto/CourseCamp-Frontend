import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/ui/Footer';
import './Profile.css';
import localAvatar from '../../assets/avatar.png';
import { getProfile, updateProfile } from '../../api/instructorService';
import { formatDate, formatInputDate, stringToSkills, skillsToString, toDateInputValue } from '../../helper/util';
import { useAuth } from '../../context/AuthContext';

const TutorProfile = () => {

  // Thêm api cập nhật profile về backend
  // Thêm api lấy profile về từ backend.
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    role: "",
    email: "",
    dob: "",
    ranking: "",
    bio: "",
    expertise: "",
    exp: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        console.log(response);
        if(response && response.meta) {
          const data = response.meta;


          setProfile(prev => ({
            ...prev,
            fullName: data.full_name || "Chưa set tên",
            bio: data.bio || "",
            dob: data.dob || "",
            email: data.email || "",
            exp: data.exp_years || "",
            expertise: skillsToString(data.expertise_areas || []),
            ranking: data.ranking || "Beginner",
            role: data.role || "instructor",
            avatarUrl: data.avatar_url || localAvatar
          }));
          console.log("profile" + profile.expertise);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const [tempProfile, setTempProfile] = useState(profile);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setTempProfile(profile);
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    try {
      // fullName, dob, avatarUrl, bio, interests, skills
      const payload = {...tempProfile, exp_years: Number(tempProfile.exp)};
      // console.log("Cập nhật hồ sơ", payload);
      const expertise = stringToSkills(tempProfile.expertise);
      payload.expertise = expertise;
      payload.dob = formatInputDate(tempProfile.dob);

      console.log(payload);
      const response = await updateProfile(payload);
      if(response && response.meta) {
        const data = response.meta;
        // console.log(data);

        setProfile(tempProfile);
        // Phải chỉnh temmpProfile về để hiển thị cho đúng, skills, interests về string
        user.name = data.full_name;
        setUser(user);
      }
      setIsEditing(false);
      alert("Hồ sơ đã được cập nhật thành công") 
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar activePage="profile" />
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
                  <p className="profile-role">Instructor</p>
                </div>
              </div>
              <div className="profile-content">
                <div className="section-header">
                  Account Information
                  <button 
                    className={`btn-edit-toggle ${isEditing ? 'active' : ''}`} 
                    onClick={handleEditClick}
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Full Name</label>
                    {isEditing ? <input 
                      type="text" 
                      className="form-control" 
                      value={tempProfile.fullName}
                      onChange={handleChange}
                      name="fullName"
                    /> : <div className='form-control'>{profile.fullName}</div>}
                    
                  </div>
                  <div className="form-group col-3">
                    <label>Birthday</label>
                    {isEditing ?
                    <input 
                      type="date" 
                      className="form-control" 
                      value={toDateInputValue(tempProfile.dob)}
                      onChange={handleChange}
                      name="dob"/>
                    : <div className='form-control'>{toDateInputValue(profile.dob)}</div>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Experience Years</label>
                    {isEditing ? <input 
                      type="text" 
                      className="form-control" 
                      value={tempProfile.exp}
                      onChange={handleChange}
                      name="exp"
                    /> : <div className='form-control'>{profile.exp}</div>}
                  </div>
                  <div className="form-group col-3">
                    <label>Email Address</label>
                    <div className='form-control'>{profile.email}</div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Expertise Area</label>
                     {isEditing ? <input 
                      type="text" 
                      className="form-control" 
                      value={tempProfile.expertise}
                      onChange={handleChange}
                      name="expertise"
                    /> : <div className='form-control'>{profile.expertise}</div>}
                  </div>
                  <div className="form-group col-3">
                    <label>Ranking</label>
                    <div className="form-control"> {profile.ranking}</div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Bio</label>
                    {isEditing ? <textarea 
                      className="form-control" 
                      value={tempProfile.bio}
                      onChange={handleChange}
                      name="bio"
                    /> : <div className='form-control'>{profile.bio}</div>}
                  </div>
                </div>

                {isEditing &&
                <div className="update-btn-container">
                  <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                </div>
                }
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default TutorProfile;