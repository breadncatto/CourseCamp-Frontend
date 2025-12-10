import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './BecomeTutor.css';
import localAvatar from '../../assets/avatar.png';

const MOCK_USER_STATUS = 'none'; // none | pending | approved


const BecomeTutor = () => {
  const [status, setStatus] = useState(MOCK_USER_STATUS);
  const navigate = useNavigate();

  // --- CASE 1: FORM ĐĂNG KÝ ---
  const RegistrationForm = () => (
    <div className="tutor-registration-card">
      
      {/* Phần thông tin cá nhân tĩnh phía trên */}
      <div className="reg-profile-header">
        <img src={localAvatar} alt="User Avatar" className="reg-avatar" />
        <div className="reg-info">
          <h2>Jurica Koletic</h2>
          <div className="reg-contact">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              juricakoletic@gmail.com
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              +1800-1892
            </span>
          </div>
        </div>
      </div>

      {/* Area of Expertise */}
      <div className="reg-section">
        <div className="reg-section-title">Area of Expertise</div>
        <input 
          type="text" 
          className="reg-input" 
          placeholder="e.g. Web Development, ReactJS, Data Science" 
          defaultValue="Web Development, ReactJS"
        />
      </div>

      {/* Introduction / Bio */}
      <div className="reg-section">
        <div className="reg-section-title">Introduction / Bio</div>
        <textarea 
          className="reg-input" 
          rows="3"
          defaultValue="I have 5 years of experience in Web Development working for top tech companies. I love sharing knowledge."
        ></textarea>
      </div>

      {/* Work Experience */}
      <div className="reg-section">
        <div className="reg-section-title">Work Experience</div>
        <textarea 
          className="reg-input" 
          rows="4"
          defaultValue={`Senior Frontend Dev at ABC Corp (2020-Present)\nJunior Dev at XYZ Ltd (2018-2020)`}
        ></textarea>
      </div>

      {/* Supporting Documents */}
      <div className="reg-section">
        <div className="reg-section-title">Supporting Documents & Links</div>
        <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
           <input 
            type="text" 
            className="reg-input" 
            placeholder="Link to Portfolio / LinkedIn / GitHub" 
          />
          <div>
            <button className="btn-upload">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Upload CV / Resume
            </button>
            <span style={{marginLeft: '10px', fontSize:'12px', color:'#888'}}>PDF, DOCX (Max 5MB)</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button className="btn btn-danger" style={{background:'white', color:'#ff5b5c', border:'1px solid #ff5b5c'}}>Cancel</button>
        <button className="btn btn-primary" onClick={() => setStatus('pending')}>Submit Application</button>
      </div>
    </div>
  );

  // --- CASE 2: PENDING STATE ---
  const PendingState = () => (
    <div className="card" style={{padding: '50px', textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
      <h2 style={{marginBottom: '15px', color: '#333'}}>Application Under Review</h2>
      <p style={{color: '#666', lineHeight: '1.6'}}>
        Your application to become a tutor has been submitted and is currently being reviewed by our team.
      </p>
      
      <div style={{marginTop: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'left'}}>
        <h4 style={{fontSize: '14px', marginBottom: '15px', borderBottom:'1px solid #ddd', paddingBottom:'10px'}}>Submission Details</h4>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom:'10px'}}>
          <span>Date Submitted:</span>
          <span style={{fontWeight: '600'}}>Oct 24, 2025 - 10:30 AM</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px'}}>
          <span>Status:</span>
          <span style={{fontWeight: '600', color: '#ff9800', background:'#fff3e0', padding:'2px 8px', borderRadius:'4px'}}>Pending Review</span>
        </div>
      </div>
    </div>
  );

  // --- CASE 3: APPROVED STATE ---
  const ApprovedState = () => (
    <div className="card" style={{padding: '50px', textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
      <h2 style={{marginBottom: '15px', color: 'var(--primary-color)'}}>You are an Instructor!</h2>
      <p style={{color: '#666', lineHeight: '1.6'}}>
        Congratulations! Your application has been approved.
      </p>
      
      <div style={{marginTop: '30px', background: '#f0f4ff', padding: '20px', borderRadius: '8px', textAlign: 'left'}}>
        <h4 style={{fontSize: '14px', marginBottom: '15px', borderBottom:'1px solid #dae7ff', paddingBottom:'10px'}}>Approval Details</h4>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom:'10px'}}>
          <span>Approved Date:</span>
          <span style={{fontWeight: '600'}}>Oct 25, 2025 - 09:15 AM</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px'}}>
          <span>Status:</span>
          <span style={{fontWeight: '600', color: 'var(--primary-color)', background:'#e8f5e9', padding:'2px 8px', borderRadius:'4px'}}>Active Tutor</span>
        </div>
      </div>

      <button className="btn btn-primary" style={{marginTop: '30px'}} onClick={() => navigate('../tutor/dashboard')}>Go to Tutor Dashboard</button>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar role="student" activePage="become-tutor" />
        <main className="main-content">
          <Header />
          <div className="content-body">
            <div className="header-section" style={{marginBottom:'20px'}}>
               {status === 'none' ? <h1>Register as a Tutor</h1> : <h1>Tutor Status</h1>}
            </div>
            {status === 'none' && RegistrationForm()}
            {status === 'pending' && PendingState()}
            {status === 'approved' && ApprovedState()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeTutor;