import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseList from "../pages/public/CourseList";
import HomePage from "../pages/public/HomePage";
import CourseDetail from "../pages/public/CourseDetail";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
// import LessonDetail from "../pages/public/LessonDetail";
import LessonDetail from "../pages/student/StudentLessonDetail";
import TutorDashboard from "../pages/tutor/Dashboard";
import TutorAddCourse from "../pages/tutor/AddCourse";
import TutorProfile from "../pages/tutor/Profile";
import TutorMyCourse from "../pages/tutor/MyCourse";
import StudentProfile from "../pages/student/Profile";
import StudentMyCourses from "../pages/student/MyCourse";
import BecomeTutor from "../pages/student/BecomeTutor"; 
import CourseApproval from "../pages/admin/CourseApproval";
import TutorRequest from "../pages/admin/TutorRequest"; 
import AuthCallback from "../callback/AuthCallback.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/course/:id" element={<CourseDetail/>}/>
        <Route path="/course-list" element={<CourseList/>}/>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonDetail />} />
        
        {/* TUTOR ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
            <Route path="/tutor/dashboard" element={<TutorDashboard />} />
            <Route path="/tutor/add-course" element={<TutorAddCourse />} />
            {/* <Route path="/tutor/my-courses" element={<TutorMyCourse />} /> */}
            <Route path="/tutor/profile" element={<TutorProfile />} />
        </Route>
        
        {/* STUDENT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/my-courses" element={<StudentMyCourses />} />
            <Route path="/student/become-tutor" element={<BecomeTutor />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/approval" element={<CourseApproval />} />
            <Route path="/admin/tutor-requests" element={<TutorRequest />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
