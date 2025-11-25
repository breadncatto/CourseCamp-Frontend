import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import TutorDashboard from "./pages/tutor/Dashboard";
import TutorAddCourse from "./pages/tutor/AddCourse";
import TutorMyCourse from "./pages/tutor/MyCourse";

import StudentProfile from "./pages/student/Profile";
import StudentMyCourses from "./pages/student/MyCourse";
import BecomeTutor from "./pages/student/BecomeTutor"; 

import CourseApproval from "./pages/admin/CourseApproval";
import TutorRequest from "./pages/admin/TutorRequest"; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/tutor/dashboard" replace />} />
        
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/tutor/add-course" element={<TutorAddCourse />} />
        <Route path="/tutor/my-course" element={<TutorMyCourse />} />
        
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/courses" element={<StudentMyCourses />} />
        <Route path="/student/become-tutor" element={<BecomeTutor />} />

        <Route path="/admin/approval" element={<CourseApproval />} />
        <Route path="/admin/tutor-requests" element={<TutorRequest />} />
      </Routes>
    </div>
  );
}

export default App;