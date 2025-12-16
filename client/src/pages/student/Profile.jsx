import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import './Profile.css';
import localAvatar from '../../assets/avatar.png';
import { getStudentProfile, updateStudentProfile } from '../../api/studentService';
import { formatDate, formatInputDate, stringToSkills, skillsToString, toDateInputValue } from '../../helper/util';
import { useAuth } from '../../context/AuthContext';

const StudentProfile = () => {

  // Thêm api cập nhật profile về backend
  // Thêm api lấy profile về từ backend.
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    role: "",
    number: "",
    email: "",
    dob: "",
    ranking: "",
    bio: "",
    skills: "",
    interests: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getStudentProfile();

        if(response && response.meta) {
          const data = response.meta;

          // console.log("Fetch data: " + data);

          setProfile(prev => ({
            ...prev,
            fullName: data.full_name || "Jurica Koletic",
            bio: data.bio || "",
            dob: data.dob || "",
            email: data.email || "",
            interests: skillsToString(data.interests || []),
            ranking: data.ranking || "Beginner",
            skills: skillsToString(data.skills || []),
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
      const payload = {...tempProfile};
      // console.log("Cập nhật hồ sơ", payload);
      const skills = stringToSkills(tempProfile.skills);
      payload.skills = skills;
      const interests = stringToSkills(tempProfile.interests);
      payload.interests = interests;
      payload.dob = formatInputDate(tempProfile.dob);

      const response = await updateStudentProfile(payload);
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
      <Header />
      <div className="body-container">
        <Sidebar role="student" activePage="profile" />
        <main className="main-content">
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
                  {/* <div className="form-group col-3">
                    <label>Phone Number</label>
                     {isEditing ? <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={profile.number}
                      value={tempProfile.number}
                      onChange={handleChange}
                      name="number"
                    /> : <div className='form-control'>{profile.number}</div>}
                  </div> */}
                  <div className="form-group col-3">
                    <label>Interests</label>
                    {isEditing ? <input 
                      type="text" 
                      className="form-control" 
                      value={tempProfile.interests}
                      onChange={handleChange}
                      name="interests"
                    /> : <div className='form-control'>{profile.interests}</div>}
                  </div>
                  <div className="form-group col-3">
                    <label>Email Address</label>
                    <div className='form-control'>{profile.email}</div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Skills</label>
                     {isEditing ? <input 
                      type="text" 
                      className="form-control" 
                      value={tempProfile.skills}
                      onChange={handleChange}
                      name="skills"
                    /> : <div className='form-control'>{profile.skills}</div>}
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

export default StudentProfile;