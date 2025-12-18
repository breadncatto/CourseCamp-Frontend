import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import CourseCard from '../../components/CourseCard';
import pythonBanner from '../../assets/python-banner.png';
import reactBanner from '../../assets/react-banner.png';
import { getMyCourses } from '../../api/studentService';

// Import file CSS vừa tạo
import './MyCourse.css'; 

const Mock_studentCourses = [
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
  const [studentCourses, setStudentCourses] = useState([]);
        // Cấu trúc 1 phần tử trong mảng meta trả về 
        // {
        //     "enrollment_id": 6,
        //     "student_id": 8,
        //     "course_id": 1,
        //     "enrolled_at": "2025-12-18T02:31:02.600Z",
        //     "lesson_progress": {
        //         "1": false,
        //         "2": false,
        //         "3": false
        //     },
        //     "courses": {
        //         "course_id": 1,
        //         "instructor_id": 1,
        //         "title": "Lập trình Web Fullstack với NodeJS",
        //         "description": "Khóa học toàn diện từ A-Z",
        //         "price": "1500000",
        //         "is_free": false,
        //         "language": "Vietnamese",
        //         "level": "intermediate",
        //         "thumbnail_url": "thumb_node.jpg",
        //         "estimated_duration_hours": null,
        //         "rating": 4.7,
        //         "review_count": 3,
        //         "status": "published",
        //         "created_at": "2025-11-19T08:28:44.686Z",
        //         "instructor_name": "Nguyễn Văn Giáo"
        //     }
        // }
  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await getMyCourses();
        if(response && response.meta) {
          setStudentCourses(response.meta);
        }
      } catch (error) {
        console.error("Error fetching student courses:", error);
      }
    };

    fetchStudentCourses();
  }, [])

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
              {studentCourses.map((c) => (
                <CourseCard 
                  key={c.courses.course_id}
                  id={c.courses.course_id} // Truyền ID để dùng cho việc điều hướng
                  title={c.courses.title}
                  // level={c.courses.level}
                  image={c.courses.thumbnail_url}
                  description={c.courses.description}
                  tag={c.courses.level}
                  progress={Math.round(Object.values(c.lesson_progress).filter(status => status === true).length / Object.values(c.lesson_progress).length * 100)}
                  first_lesson_id={Object.keys(c.lesson_progress)[0]}
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