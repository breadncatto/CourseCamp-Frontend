import React from "react";
import "./HomePage.css";
import logoCourseCamp from "../assets/logo-coursecamp.png";
import { Search, BookOpen, GraduationCap, Users, Clock, CheckCircle, Award, Headphones, Play } from "lucide-react";

const HomePage = () => {
  const stats = [
    { icon: <BookOpen />, value: "500+", label: "Khóa học" },
    { icon: <Users />, value: "10.000+", label: "Học viên" },
    { icon: <GraduationCap />, value: "200+", label: "Giảng viên" },
    { icon: <Clock />, value: "20.000+", label: "Giờ học" },
  ];

  const features = [
    { icon: <CheckCircle />, text: "Chứng chỉ hoàn thành" },
    { icon: <Award />, text: "Học mọi lúc, mọi nơi" },
    { icon: <Play />, text: "Theo dõi quá trình học" },
    { icon: <Headphones />, text: "Giải đáp 24/7" },
  ];

  const courses = [
    {
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      badge: "PROGRAMMING",
      level: "Beginner",
      title: "Intro to Python",
      description:
        "Learn the basics of Python programming: syntax, data types, control flow, and mini projects.",
      price: "1.140.000 vnđ",
    },
    {
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      badge: "FRONTEND",
      level: "Intermediate",
      title: "Web UI with React",
      description:
        "Build modern frontends using React hooks, component patterns, and state management.",
      price: "3.290.000 vnđ",
    },
     {
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=250&fit=crop",
      badge: "PROGRAMMING",
      badgeColor: "orange",
      level: "Beginner",
      title: "Intro to Python",
      description: "Learn the basics of python programming: syntax, data types, control flow, and mini projects.",
      price: "1.140.000 vnđ"
    },
    {
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=250&fit=crop",
      badge: "FRONTEND",
      badgeColor: "orange",
      level: "Intermediate",
      title: "Web UI with react",
      description: "Build modern frontends using React hooks, component patterns, and state management.",
      price: "3.290.000 vnđ"
    },
  ];

  const testimonials = [
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      name: "Nguyễn Đình Kiên",
      rating: 5,
      course: "Khóa học: Lập trình Python cơ bản",
      text: "Khóa học này thật sự rất tốt, phù hợp với người mới bắt đầu. Giảng viên rất nhiệt tình, bài giảng dễ hiểu và chi tiết.",
    },
    {
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
      name: "Lê Đình Mạnh",
      rating: 5,
      course: "Khóa học: English for Communication",
      text: "The instructor's explanations are clear and the interactive exercises really boosted my confidence.",
    },
    {
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
      name: "Lê Thị Thủy",
      rating: 5,
      course: "Khóa học: Thiết kế web",
      text: "Giáo trình học trực tuyến, giảng viên hướng dẫn nhiệt tình, giáo trình được sắp xếp hợp lý, mình mong có thêm nhiều bài tập thực hành phần web tới kỹ năng luyện thi tay hàng. Dù vậy, đây là khóa học rất tốt mình muốn giới thiệu với bạn bè.",
      likes: 1053
    },
    {
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
      name: "Vũ Lê Nam Thuận",
      rating: 5,
      course: "Khóa học: Phân tích dữ liệu với SQL",
      text: "Mình rất ấn tượng với cách giảng giải logic dễ hiểu từ database. Những ví dụ thực tế rất đơn giản, dễ tiếp thu và hữu ích cho công việc hiện tại của mình. Đây là nền tảng cơ bản và vững để trở thành Data Analyst cấp công nghệ cổng thông tin!",
      likes: 907
    },
  ];

  return (
    <div className="home-page">
      {/* Header */}
      <header className="navbar">
        <div className="nav-left">
          <img src={logoCourseCamp} alt="CourseCamp" className="logo" />
        </div>
        <div className="nav-right">
          <button className="btn primary">Khám phá khóa học</button>
          <button className="btn secondary">Đăng nhập</button>
          <img
            className="avatar"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
            alt="user"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src={logoCourseCamp} alt="CourseCamp" className="hero-logo" />
        <p className="hero-subtitle">Khám phá tri thức & Phát triển kĩ năng</p>

        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm khóa học" />
          <button className="search-btn">
            <Search />
          </button>
        </div>

        <div className="features">
          {features.map((f, i) => (
            <div key={i} className="feature-item">
              {f.icon}
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-icon">{s.icon}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="courses">
        <h2>Khóa học nổi bật</h2>
        <div className="course-list">
          {courses.map((c, i) => (
            <div key={i} className="course-card">
              <img src={c.image} alt={c.title} />
              <div className="course-info">
                <span className="badge">{c.badge}</span>
                <span className="level">{c.level}</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <div className="course-footer">
                  <span className="price">{c.price}</span>
                  <button className="btn small">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Học viên nói gì về chúng tôi?</h2>
        <div className="testimonial-list">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-header">
                <img src={t.avatar} alt={t.name} className="avatar" />
                <div>
                  <h4>{t.name}</h4>
                  <p>{"★".repeat(t.rating)}</p>
                </div>
              </div>
              <p className="testimonial-text">{t.text}</p>
              <p className="testimonial-course">{t.course}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-col">
          <img src={logoCourseCamp} alt="logo" className="logo" />
          <p>Keep learning, stay curious. CourseCamp © 2025.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Subscribe</h4>
          <input type="email" placeholder="Enter your email" />
          <button className="btn primary">Subscribe</button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
