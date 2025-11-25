import React from 'react';
import Sidebar from '../../components/Sidebar';
import CourseCard from '../../components/CourseCard';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './Dashboard.css';
import pythonBanner from '../../assets/python-banner.png';
import reactBanner from '../../assets/react-banner.png';

const stats = [
  { label: 'Total Courses', value: '2', bg: '#e0e0e0' },
  { label: 'Average Price (VND)', value: '1.805.000', bg: '#e0e0e0' },
  { label: 'Level Distribution', value: 'B:1 * I:1 * A:0', bg: '#e0e0e0' },
];

const recentCourses = [
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

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar activePage="dashboard" />
        <main className="main-content">
          <Header />
          <div className="content-body">
            <div className="header-section">
              <h1>Dashboard</h1>
              <p className="subtitle">Quick overview of your courses</p>
            </div>

            <div className="stats-grid">
              {stats.map((item, index) => (
                <div key={index} className="stat-box">
                  <h3>{item.label}</h3>
                  <div className="stat-value">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="section-title">
              <h2>Recent Courses</h2>
            </div>

            <div className="courses-grid">
              {recentCourses.map((course) => (
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

export default Dashboard;