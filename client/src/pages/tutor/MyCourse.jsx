import React from 'react';
import Sidebar from '../../components/Sidebar';
import CourseCard from '../../components/CourseCard';
import Footer from '../../components/ui/Footer';
import Header from '../../components/Header';
import './MyCourse.css';
import pythonBanner from '../../assets/python-banner.png';
import reactBanner from '../../assets/react-banner.png';

const myCourses = [
  {
    id: 1,
    title: 'Intro to Python',
    level: 'Beginner',
    price: 1140000,
    image: pythonBanner,
    description: 'Get started with Python programming: syntax, data types, control flow, and mini projects.',
    tag: 'PROGRAMMING'
  },
  {
    id: 2,
    title: 'Web UI with React',
    level: 'Intermediate',
    price: 3290000,
    image: reactBanner,
    description: 'Build modern frontends using React hooks, component patterns, and state management.',
    tag: 'FRONTEND'
  }
];

const MyCourse = () => {
  //  Fetch danh sách khóa học từ backend về
  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar activePage="my-course" />
        <main className="main-content">
          <Header />
          <div className="content-body">
            <div className="header-section">
              <h1>My Courses</h1>
              <p className="subtitle">Manage all your created courses</p>
            </div>
            <div className="courses-grid">
              {myCourses.map((course) => (
                <CourseCard 
                  key={course.id}
                  title={course.title}
                  level={course.level}
                  price={course.price}
                  image={course.image}
                  description={course.description}
                  tag={course.tag}
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

export default MyCourse;