import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import CourseCard from '../../components/CourseCard';
import Footer from '../../components/ui/Footer';
import Header from '../../components/Header';
import './Dashboard.css';
import pythonBanner from '../../assets/python-banner.png';
import reactBanner from '../../assets/react-banner.png';
import { Link } from 'react-router-dom';
import { getMyCourses, getStats, getStudents } from '../../api/instructorService';
import { mapCoursesData, mapStudentData } from '../../helper/util';
// Hàm tiện ích format tiền tệ (nên tách ra file utils riêng sau này)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Dashboard = () => {
  // State quản lý dữ liệu dashboard
  // const [fetchDashboardData, setFetchDashboardData] = useState({
  //   stats: [],
  //   courses: [],
  //   students: []
  // });
  const [dashboardData, setDashboardData] = useState([]);

  const [loading, setLoading] = useState(true);
  const getRankColor = (rank) => {
    if(!rank) return 'badge-bronze';
    switch (rank.toLowerCase()) {
      case 'diamond': return 'badge-diamond';
      case 'gold': return 'badge-gold';
      case 'silver': return 'badge-silver';
      default: return 'badge-bronze';
    }
  };
  // Gọi API cho backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const coursesRes = await getMyCourses();
        // console.log(coursesRes);

        // if(coursesRes && coursesRes.meta) {
        //   console.log(coursesRes.meta);
        //   setFetchDashboardData({
        //     courses: coursesRes.meta
        //   });
        // }
        // console.log(fetchDashboardData.courses)

        // const statsRes = await getStats();

        // if(statsRes && statsRes.meta) {
        //   setFetchDashboardData({
        //     ...fetchDashboardData,
        //     stats: statsRes.meta
        //   });
        // }
        // const studentsRes = await getStudents();

        // if(studentsRes && studentsRes.meta) {
        //   setFetchDashboardData({
        //     ...fetchDashboardData,
        //     students: studentsRes.meta.data
        //   });
        // }
        const [coursesRes, statsRes, studentsRes] = await Promise.all([
          getMyCourses(),
          getStats(),
          getStudents()
        ]);

        const rawCourses = coursesRes?.meta || []; 
        const rawStats = statsRes?.meta || {};
        const rawStudents = studentsRes?.meta?.data || [];

        console.log(rawCourses);
        console.log(rawStats);
        console.log(rawStudents);


        const formattedCourses = mapCoursesData(rawCourses); 
        const formattedStudents = mapStudentData(rawStudents);

        // Mock Data trả về từ Backend

        const mockData = {
          stats: [
            { label: 'Tổng doanh thu', value: rawStats.revenue || 0, type: 'money', icon: '💵', color: '#10b981' }, // Xanh lá
            { label: 'Học viên', value: rawStats.numStudents || 0, type: 'number', icon: '👨‍🎓', color: '#3b82f6' }, // Xanh dương
            { label: 'Khóa học', value: rawStats.numCourses || 0, type: 'number', icon: '📚', color: '#8b5cf6' }, // Tím
            { label: 'Số đánh giá', value: rawStats.numRatings || 0, type: 'number', icon: '⭐', color: '#f59e0b'} // Vàng
          ],
          courses: formattedCourses,
          students: formattedStudents
        };


        setDashboardData(mockData);
        console.log(dashboardData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar activePage="dashboard" />
        <main className="main-content">
          <Header />
          <div className="content-body">
            
            {/* Header Section */}
            <div className="header-section">
              <div>
                <h1>Tổng quan</h1>
                <p className="subtitle">Chào mừng trở lại! Đây là trang tổng quan của bạn</p>
              </div>
              <Link to="/tutor/add-course"><div className="btn-create-course">+ Tạo khóa học mới</div></Link>
            </div>

            {loading ? (
              <div className="loading-state">Đang tải dữ liệu...</div>
            ) : (
              <>
                {/* Stats Grid - Hiển thị thông số quan trọng */}
                <div className="stats-grid">
                  {dashboardData.stats.map((item, index) => (
                    <div key={index} className="dashboard-stat-card" style={{ borderLeft: `4px solid ${item.color}` }}>
                      <div className="stat-icon" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                        {item.icon}
                      </div>
                      <div className="stat-info">
                        <span className="stat-label">{item.label}</span>
                        <h3 className="stat-value">
                          {item.type === 'money' ? formatCurrency(item.value) : item.value}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dashboard Split Layout: 70% Courses - 30% Activities */}
                <div className="dashboard-sections">
                  
                  {/* Cột trái: Danh sách khóa học */}
                  <div className="main-section">
                    <div className="section-header">
                      <h2>Khóa học gần đây</h2>
                      <a href="/courses" className="view-all">Xem tất cả</a>
                    </div>
                    {dashboardData.courses.length > 0 ?
                    (<div className="courses-grid">
                      {dashboardData.courses.map((course) => (
                        <CourseCard 
                          key={course.id}
                          status={course.status}
                          {...course}
                        />
                      ))}
                    </div>) : <p className="empty-text">Chưa khởi tạo khóa học nào.</p> }
                  </div>

                  {/* Cột phải: Hoạt động gần đây (New feature) */}
                  <div className="side-section">
                    <div className="section-header">
                      <h2>Học viên nổi bật</h2>
                    </div>
                    
                    <div className="student-list-container">
                      {dashboardData.students.length > 0 ? (
                        <div className="student-list">
                          {dashboardData.students.slice(0, 10).map((student) => (
                            <div key={student.id} className="student-item">
                              <div className="student-avatar">
                                {student.full_name.charAt(0).toUpperCase()}
                              </div>
                              
                              <div className="student-info">
                                <p className="student-name">{student.full_name}</p>
                                <p className="student-email">{student.email}</p>
                              </div>

                              <div className={`student-rank ${getRankColor(student.ranking)}`}>
                                {student.ranking}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="empty-text">Chưa có học viên đăng ký.</p>
                      )}
                    </div>
                    
                    <div className="section-footer">
                      <a href="/students" className="btn-view-students">Quản lý học viên</a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;