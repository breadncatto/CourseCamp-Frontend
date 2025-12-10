import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Header from '../../components/Header'; 
import './AddCourse.css';

const AddCourse = () => {
  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar activePage="add-course" />
        <main className="main-content">
          <Header />
          <div className="content-body">
            <div className="header-section">
               <h1>Add New Course</h1>
            </div>
            <div className="card form-card">
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" placeholder="Enter course title" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows="5" placeholder="Short description of the course"></textarea>
              </div>
              <div className="form-row">
                <div className="form-group col-3">
                  <label>Price</label>
                  <input type="number" className="form-control" defaultValue={0} />
                </div>
                <div className="form-group col-3">
                  <label>Level</label>
                  <select className="form-control">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>Category</label>
                  <select className="form-control">
                    <option>Backend</option><option>Frontend</option><option>Fullstack</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Cover Image</label>
                <div className="upload-area">
                  <div className="upload-icon">↑</div>
                  <p>Upload Image</p>
                </div>
              </div>
              <div className="button-group">
                <button className="btn btn-primary">Save & Create</button>
                <button className="btn btn-danger">Reset</button>
              </div>
            </div>
          </div> 
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AddCourse;