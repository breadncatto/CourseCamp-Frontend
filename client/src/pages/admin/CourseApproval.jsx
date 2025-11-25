import React, { useState, useMemo } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import './CourseApproval.css';

import pythonBanner from '../../assets/python-banner.png';
import reactBanner from '../../assets/react-banner.png';

const pendingCourses = [
  {
    id: 101,
    title: "Intro to Python",
    tutor: "Nguyen Van A",
    tutorStats: { approved: 12, rejectRate: "5%" },
    submittedAt: "2025-10-20 08:30 AM",
    level: "Beginner",
    price: 1140000,
    category: "Programming",
    thumbnail: pythonBanner,
    description: "Get started with Python programming: syntax, data types, control flow, and mini projects. Ideal for beginners looking to enter the world of data science.",
    
    curriculum: [
      {
        id: "sec1", title: "Introduction", totalTime: "25:00",
        lessons: [
          { id: 1, name: "Welcome to the course", duration: "05:00", type: "video" },
          { id: 2, name: "Installing Python", duration: "10:00", type: "video" },
          { id: 3, name: "Course Resources", duration: "10:00", type: "reading" }
        ]
      },
      {
        id: "sec2", title: "Python Basics", totalTime: "45:00",
        lessons: [
          { id: 4, name: "Variables and Types", duration: "15:00", type: "video" },
          { id: 5, name: "Lists and Dictionaries", duration: "20:00", type: "video" },
          { id: 6, name: "Basic Quiz", duration: "10:00", type: "quiz" }
        ]
      }
    ],

    documents: [
      { id: 1, name: "Python_Cheat_Sheet.pdf", size: "2.5 MB", type: "pdf" },
      { id: 2, name: "Exercise_Files.zip", size: "15 MB", type: "zip" }
    ]
  },
  {
    id: 102,
    title: "Web UI with React",
    tutor: "Tran Thi B",
    tutorStats: { approved: 2, rejectRate: "50%" },
    submittedAt: "2025-10-21 09:15 AM",
    level: "Intermediate",
    price: 3290000,
    category: "FrontEnd",
    thumbnail: reactBanner,
    description: "Build modern frontends using React hooks, component patterns, and state management.",
    
    curriculum: [
      {
        id: "sec1", title: "React Fundamentals", totalTime: "30:00",
        lessons: [
          { id: 1, name: "JSX & Components", duration: "15:00", type: "video" },
          { id: 2, name: "State & Props", duration: "15:00", type: "video" }
        ]
      }
    ],
    documents: [
      { id: 1, name: "React_Hooks_Guide.pdf", size: "1.2 MB", type: "pdf" }
    ]
  }
];

const CourseApproval = () => {
  const [selectedCourse, setSelectedCourse] = useState(pendingCourses[0]);
  const [activeTab, setActiveTab] = useState("Description"); // State quản lý tab
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  
  // Filter & Sort State
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date_desc");

  // Reject Form State
  const [rejectReason, setRejectReason] = useState([]);
  const [rejectComment, setRejectComment] = useState("");

  const reasons = [
    "Content Accuracy: Contains factual errors or outdated information.",
    "Pedagogical Quality: Explanations are unclear, unstructured, or lack educational value.",
    "Audio Quality: Background noise, inconsistent volume levels, or poor clarity.",
    "Video Quality: Low resolution (below 720p), bad lighting, or shaky camera work.",
    "Copyright Violation: Uses unauthorized third-party material or assets.",
    "Misleading Metadata: Title/Description does not accurately reflect course content.",
    "Resource Missing: Essential exercise files or code snippets are missing.",
    "Policy Violation: Contains promotional content or inappropriate material.",
    "Others."
  ];

  const processedCourses = useMemo(() => {
    let courses = [...pendingCourses];
    if (filterCategory !== "All") {
      courses = courses.filter(c => c.category === filterCategory);
    }
    courses.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "tutor_rep") return parseFloat(a.tutorStats.rejectRate) - parseFloat(b.tutorStats.rejectRate);
      return new Date(b.submittedAt) - new Date(a.submittedAt); 
    });
    return courses;
  }, [filterCategory, sortBy]);

  const handleReasonChange = (reason) => {
    if (rejectReason.includes(reason)) {
      setRejectReason(rejectReason.filter(r => r !== reason));
    } else {
      setRejectReason([...rejectReason, reason]);
    }
  };

  const handleConfirmReject = () => {
    alert(`Rejection email sent to Tutor ${selectedCourse.tutor}.\nReasons: ${rejectReason.join(", ")}\nNote: ${rejectComment}`);
    setShowRejectModal(false);
    setRejectReason([]);
    setRejectComment("");
  };

  const handleConfirmApprove = () => {
    alert(`Course "${selectedCourse.title}" has been approved!`);
    setShowApproveModal(false);
  };

  const getLessonIcon = (type) => {
    switch(type) {
      case 'video': return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
      case 'reading': return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
      case 'quiz': return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
      default: return null;
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar role="admin" activePage="approval" /> 
        
        <main className="main-content">
          <Header />
          
          <div className="content-body">
            <div className="header-section">
              <h1>Course Approval</h1>
              <p className="subtitle">Quality Assurance & Content Moderation Queue</p>
            </div>

            <div className="approval-container">
              {/* LEFT COLUMN */}
              <div className="pending-list-panel">
                <div className="panel-header">
                  <div className="header-title">
                    Pending List <span className="badge-count">{processedCourses.length}</span>
                  </div>
                  <div className="filter-controls">
                    <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                      <option value="All">All Categories</option>
                      <option value="Programming">Programming</option>
                      <option value="FrontEnd">FrontEnd</option>
                    </select>
                    <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="date_desc">Newest First</option>
                      <option value="price_asc">Low Price</option>
                      <option value="tutor_rep">Best Tutor</option>
                    </select>
                  </div>
                </div>

                <div className="pending-list">
                  {processedCourses.map(course => (
                    <div 
                      key={course.id} 
                      className={`pending-item ${selectedCourse?.id === course.id ? 'active' : ''}`}
                      onClick={() => { setSelectedCourse(course); setActiveTab("Description"); }}
                    >
                      <div className="item-title">{course.title}</div>
                      <div className="item-tutor">
                        <span style={{marginRight: 5}}>👤</span> {course.tutor}
                        <span className="tutor-reputation" title="Approved | Reject Rate">
                          ★ {course.tutorStats.approved} | ⚠ {course.tutorStats.rejectRate}
                        </span>
                      </div>
                      <div className="item-meta">
                        <span>{course.category}</span>
                        <span className="item-time">{course.submittedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: DETAILS */}
              {selectedCourse ? (
                <div className="course-detail-panel">
                  <div className="detail-scroll-area">
                    <div className="course-preview-header">
                      <img src={selectedCourse.thumbnail} alt="Thumb" className="preview-img" />
                      <div className="course-meta">
                        <div className="meta-tags">
                          <span className="tag category">{selectedCourse.category}</span>
                          <span className="tag level">{selectedCourse.level}</span>
                          <span className="tag price">{selectedCourse.price.toLocaleString()} VND</span>
                        </div>
                        <h2>{selectedCourse.title}</h2>
                        <p style={{color: '#666', fontSize: '14px'}}>
                          Created by <strong>{selectedCourse.tutor}</strong> 
                        </p>
                      </div>
                    </div>

                    {/* TABS NAVIGATION */}
                    <div className="content-tabs">
                      <div className={`tab-btn ${activeTab === 'Description' ? 'active' : ''}`} onClick={() => setActiveTab('Description')}>
                        Description
                      </div>
                      <div className={`tab-btn ${activeTab === 'Curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('Curriculum')}>
                        Curriculum ({selectedCourse.curriculum.reduce((acc, sec) => acc + sec.lessons.length, 0)})
                      </div>
                      <div className={`tab-btn ${activeTab === 'Documents' ? 'active' : ''}`} onClick={() => setActiveTab('Documents')}>
                        Documents ({selectedCourse.documents.length})
                      </div>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="tab-content">
                      
                      {/* 1. Description Tab */}
                      {activeTab === 'Description' && (
                        <>
                          <h4 style={{marginBottom: '10px'}}>About this course</h4>
                          <p style={{lineHeight: '1.6', color: '#555', marginBottom: '30px'}}>
                            {selectedCourse.description}
                          </p>
                          <div style={{padding: '15px', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc'}}>
                            <h4>Checklist:</h4>
                            <label style={{display:'block', margin:'5px 0'}}><input type="checkbox" /> Title matches content</label>
                            <label style={{display:'block', margin:'5px 0'}}><input type="checkbox" /> No offensive content</label>
                            <label style={{display:'block', margin:'5px 0'}}><input type="checkbox" /> Audio quality pass</label>
                          </div>
                        </>
                      )}

                      {/* 2. Curriculum Tab*/}
                      {activeTab === 'Curriculum' && (
                        <div className="curriculum-container">
                          {selectedCourse.curriculum.map(section => (
                            <div key={section.id} className="curriculum-section">
                              <div className="section-header">
                                <span>{section.title}</span>
                                <span className="section-stats">{section.lessons.length} lessons • {section.totalTime}</span>
                              </div>
                              <div className="section-body">
                                {section.lessons.map(lesson => (
                                  <div key={lesson.id} className="lesson-item">
                                    <div className="lesson-info">
                                      <div className="lesson-icon">{getLessonIcon(lesson.type)}</div>
                                      <div className="lesson-name">{lesson.name}</div>
                                    </div>
                                    <div className="lesson-meta">
                                      <span>{lesson.duration}</span>
                                      {lesson.type === 'video' && (
                                        <button className="btn-preview" onClick={() => alert("Opening video player...")}>
                                          Preview
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 3. Documents Tab*/}
                      {activeTab === 'Documents' && (
                        <div className="document-list">
                          {selectedCourse.documents.map(doc => (
                            <div key={doc.id} className="document-item">
                              <div className="doc-icon">
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                              </div>
                              <div className="doc-info">
                                <div className="doc-name">{doc.name}</div>
                                <div className="doc-size">{doc.size} • {doc.type.toUpperCase()}</div>
                              </div>
                              <button className="btn-download" title="Download" onClick={() => alert("Downloading file...")}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* ACTION FOOTER */}
                  <div className="action-footer">
                    <button 
                      className="btn btn-danger" 
                      onClick={() => setShowRejectModal(true)}
                    >
                      ✕ Reject
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowApproveModal(true)}
                    >
                      ✓ Approve Course
                    </button>
                  </div>
                </div>
              ) : (
                <div className="course-detail-panel" style={{alignItems: 'center', justifyContent: 'center', color: '#999'}}>
                  Select a course to view details
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals: Approve & Reject */}
      {showApproveModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title" style={{color: 'var(--primary-color)'}}>Confirm Approval</h3>
            <p>The course <strong>"{selectedCourse.title}"</strong> will be published.</p>
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
            <h3 className="modal-title" style={{color: 'var(--danger-color)'}}>Reject Course</h3>
            <p style={{marginBottom: '15px', fontSize: '14px'}}>Select reasons:</p>
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

export default CourseApproval;