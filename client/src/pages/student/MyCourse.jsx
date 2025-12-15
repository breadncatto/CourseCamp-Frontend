import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import CourseCard from '../../components/CourseCard';
import pythonBanner from '../../assets/python-banner.png';
import reactBanner from '../../assets/react-banner.png';

// Import file CSS vừa tạo
import './MyCourse.css'; 

const studentCourses = [
  {
    id: 1,
    title: 'Intro to Python',
    level: 'Beginner',
    image: pythonBanner,
    description: 'Get started with Python programming: syntax, data types, control flow, and mini projects.',
    tag: 'Programming',
    progress: 70
  },
  {
    id: 2,
    title: 'Web UI with React',
    level: 'Intermediate',
    image: reactBanner,
    description: 'Build modern frontends using React hooks, component patterns, and state management.',
    tag: 'Frontend',
    progress: 20
  }
];

const StudentMyCourses = () => {
  return (
    <div className="dashboard-layout">
      <Header /> 
      <div className="body-container">
        <Sidebar role="student" activePage="courses" />
        <main className="main-content">
          <div className="content-body">
            <div className="header-section">
              <h1>My Courses</h1>
              <p className="subtitle">Courses you are enrolled in</p>
            </div>
            
            {/* Sử dụng class courses-grid thay vì style inline để layout đẹp và responsive */}
            <div className="courses-grid">
              {studentCourses.map((course) => (
                <CourseCard 
                  key={course.id}
                  id={course.id} // Truyền ID để dùng cho việc điều hướng
                  title={course.title}
                  level={course.level}
                  image={course.image}
                  description={course.description}
                  tag={course.tag}
                  progress={course.progress}
                />
              ))}
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StudentMyCourses;