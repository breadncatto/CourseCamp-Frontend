import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import './TutorRequest.css';

const pendingRequests = [
  {
    id: 1,
    name: "Le Van C",
    email: "levanc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    submittedAt: "2025-10-22 14:30",
    phone: "0909123456",
    expertise: "Web Development, ReactJS",
    introduction: "I have 5 years of experience in Web Development...",
    experience: "Senior Frontend Dev at ABC Corp (2020-Present)\nJunior Dev at XYZ Ltd (2018-2020)",
    cvLink: "#",
    portfolioLink: "https://levanc-portfolio.com" // Thêm link portfolio
  },
  {
    id: 2,
    name: "Pham Thi D",
    email: "phamthid@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    submittedAt: "2025-10-23 09:00",
    phone: "0912345678",
    expertise: "Data Science, Python",
    introduction: "Passionate about data and AI...",
    experience: "Data Analyst at DataCo (3 years)",
    cvLink: "#",
    portfolioLink: "https://github.com/phamthid"
  }
];

const TutorRequest = () => {
  const [selectedReq, setSelectedReq] = useState(pendingRequests[0]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState([]);
  const [rejectComment, setRejectComment] = useState("");
  
  const reasons = [
    "Insufficient teaching experience.",
    "CV/Portfolio link is invalid or inaccessible.",
    "Expertise does not match our platform focus.",
    "Introduction is too short or unprofessional.",
    "Profile picture is not clear or inappropriate."
  ];

  const handleReasonChange = (reason) => {
    if (rejectReason.includes(reason)) {
      setRejectReason(rejectReason.filter(r => r !== reason));
    } else {
      setRejectReason([...rejectReason, reason]);
    }
  };

  const handleConfirmApprove = () => {
    alert(`User ${selectedReq.name} is now a Tutor!`);
    setShowApproveModal(false);
  };

  const handleConfirmReject = () => {
    alert(`Request rejected. Email sent to ${selectedReq.email}.`);
    setShowRejectModal(false);
  };

  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar role="admin" activePage="tutor-request" /> 
        <main className="main-content">
          <Header />
          <div className="content-body">
            <div className="header-section">
              <h1>Tutor Requests</h1>
              <p className="subtitle">Review applications to become instructors</p>
            </div>

            <div className="request-container">
              {/* LEFT LIST */}
              <div className="request-list-panel">
                <div style={{padding: '15px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#555'}}>
                  Pending Requests ({pendingRequests.length})
                </div>
                <div style={{overflowY: 'auto'}}>
                  {pendingRequests.map(req => (
                    <div 
                      key={req.id} 
                      className={`request-item ${selectedReq?.id === req.id ? 'active' : ''}`}
                      onClick={() => setSelectedReq(req)}
                    >
                      <img src={req.avatar} alt="avt" className="req-avatar" />
                      <div className="req-info">
                        <h4>{req.name}</h4>
                        <p>{req.submittedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT DETAIL */}
              {selectedReq ? (
                <div className="request-detail-panel">
                  <div className="applicant-header">
                    <img src={selectedReq.avatar} alt="Big Avt" className="big-avatar" />
                    <div className="applicant-meta">
                      <h2>{selectedReq.name}</h2>
                      <span>📧 {selectedReq.email}</span>
                      <span>📱 {selectedReq.phone}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Area of Expertise</h4>
                    <div className="detail-content">{selectedReq.expertise}</div>
                  </div>

                  <div className="detail-section">
                    <h4>Introduction / Bio</h4>
                    <div className="detail-content">{selectedReq.introduction}</div>
                  </div>

                  <div className="detail-section">
                    <h4>Work Experience</h4>
                    <div className="detail-content" style={{whiteSpace: 'pre-line'}}>
                      {selectedReq.experience}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Supporting Documents & Links</h4>
                    <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                      {}
                      {selectedReq.portfolioLink && (
                        <a href={selectedReq.portfolioLink} className="cv-link" target="_blank" rel="noreferrer" style={{background:'#f5f5f9', color:'#333'}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                          Portfolio: {selectedReq.portfolioLink}
                        </a>
                      )}
                      
                      <a href={selectedReq.cvLink} className="cv-link" target="_blank" rel="noreferrer">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Download CV / Resume
                      </a>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="btn btn-danger" onClick={() => setShowRejectModal(true)}>Reject Application</button>
                    <button className="btn btn-primary" onClick={() => setShowApproveModal(true)}>Approve as Tutor</button>
                  </div>
                </div>
              ) : (
                <div className="request-detail-panel" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999'}}>
                  Select a request to view details
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ... (Giữ nguyên Modal code) ... */}
      {showApproveModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title" style={{color: 'var(--primary-color)'}}>Confirm Approval</h3>
            <p>Are you sure you want to promote <strong>{selectedReq.name}</strong> to Tutor?</p>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowApproveModal(false)} style={{border: '1px solid #ddd'}}>Cancel</button>
              <button className="btn btn-primary" onClick={handleConfirmApprove}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title" style={{color: 'var(--danger-color)'}}>Reject Application</h3>
            <p style={{marginBottom: '15px', fontSize: '14px'}}>Select reasons for rejection:</p>
            <div className="reject-reasons">
              {reasons.map((r, idx) => (
                <label key={idx} className="reason-option">
                  <input type="checkbox" checked={rejectReason.includes(r)} onChange={() => handleReasonChange(r)}/>
                  {r}
                </label>
              ))}
            </div>
            <textarea className="form-control" rows="3" placeholder="Additional notes..." value={rejectComment} onChange={(e) => setRejectComment(e.target.value)} style={{marginTop: '10px'}}></textarea>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowRejectModal(false)} style={{border: '1px solid #ddd'}}>Cancel</button>
              <button className="btn btn-danger" onClick={handleConfirmReject} disabled={rejectReason.length === 0}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorRequest;