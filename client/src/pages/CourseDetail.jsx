//TODO:
/*
  - Thêm vào props cho function CourseDetail để nhận bất kỳ một khóa học nào sẽ trả về nó
 */
import React from "react";
import "./CourseDetail.css";
import logoCourseCamp from "../assets/logo-coursecamp.png";
import Footer from "../components/ui/Footer";
import { Link } from "react-router-dom";

const CourseDetail = () => {
  const course = {
    title: "Intro to Python",
    instructor: "Prof. Alex",
    price: "1.140.000 VND",
    enrolled: 67,
    level: "Beginner",
    rating: 4.9,
    reviews: 1234,
    satisfaction: 97,
    description:
      "Get started with Python programming: syntax, data types, control flow, and mini projects.",
    topics: ["Programming"],
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop",
  };

  return (
    <div className="coursedetail-page">
      {/* Header */}
      <header className="coursedetail-header">
        <Link to="/"><img src={logoCourseCamp} alt="CourseCamp" className="logo" /></Link>
      </header>

      {/* Hero */}
      <section className="coursedetail-hero">
        <div className="hero-container">
          <h1>{course.title}</h1>
          <p className="price">{course.price}</p>
          <button className="btn primary">Enroll now</button>
          <p className="subtext">{course.enrolled} already enrolled</p>
        </div>
      </section>

      {/* Stats */}
      <section className="coursedetail-stats">
        <div className="stat-box">
          <h3>{course.level} level</h3>
          <p>Recommended experience</p>
        </div>
        <div className="stat-box">
          <h3>{course.rating}</h3>
          <p>({course.reviews} reviews)</p>
        </div>
        <div className="stat-box">
          <h3>Flexible schedule</h3>
          <p>Learning at your own pace</p>
        </div>
        <div className="stat-box">
          <h3>{course.satisfaction}%</h3>
          <p>Most learners liked this course</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="coursedetail-tabs">
        <button className="tab active">Course Info</button>
        <button className="tab">Outcomes</button>
        <button className="tab">Syllabus</button>
        <button className="tab">Reading</button>
        <button className="tab">Assignment</button>
        <button className="tab">Reviews</button>
      </div>

      {/* Course Description */}
      <section className="coursedetail-content">
        <h2>Course Description</h2>
        <p>{course.description}</p>
      </section>

      {/* Course Info */}
      <section className="coursedetail-info">
        <h2>Course Info</h2>
        <div className="info-grid">
          <div>
            <h4>INSTRUCTOR</h4>
            <p>{course.instructor}</p>
          </div>
          <div>
            <h4>LEVEL</h4>
            <p>{course.level}</p>
          </div>
          <div>
            <h4>TOPICS</h4>
            <p>{course.topics.join(", ")}</p>
          </div>
          <div>
            <img
              src={course.image}
              alt="Programming code"
              className="info-image"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CourseDetail;
