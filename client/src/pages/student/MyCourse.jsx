import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import pythonBanner from '../../assets/python-banner.png';
import reactBanner from '../../assets/react-banner.png';

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
      <div className="body-container">
        <Sidebar role="student" activePage="courses" />
        <main className="main-content">
          <Header /> 
          <div className="content-body">
            <div className="header-section">
              <h1>My Courses</h1>
              <p className="subtitle">Courses you are enrolled in</p>
            </div>
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
              {studentCourses.map((course) => (
                <CourseCard 
                  key={course.id}
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