import React from "react";
import CourseList from "./pages/CourseList";
import HomePage from "./pages/HomePage";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import LessonDetail from "./pages/LessonDetail";
function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <CourseDetail /> */}
      {/* <HomePage /> */}
      {/* <CourseList /> */}
      {/* Phan Route cho tung page: */}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/course/:id" element={<CourseDetail/>}/>
        <Route path="/course-list" element={<CourseList/>}/>
        <Route path="/course/:id/lesson/:lessonId" element={<LessonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
