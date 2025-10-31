import { useState } from "react";
import "./CourseList.css";
import logoCourseCamp from "../assets/logo-coursecamp.png";
import CourseFilters from "../components/ui/CourseFilters.jsx";
import CourseCard from "../components/ui/CourseCard.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/ui/Footer.jsx";

function CourseList() {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: 1,
      title: "Intro to Python",
      instructor: "Prof. Alex",
      price: "1.140.000 VND",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      tags: ["Programming", "Beginner"],
    },
    {
      id: 2,
      title: "Web UI with React",
      instructor: "Prof. Sarah",
      price: "3.290.000 VND",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      tags: ["Frontend", "Intermediate"],
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      instructor: "Prof. John",
      price: "2.500.000 VND",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["Data Science", "Beginner"],
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="course-page">
      {/* ---------- Header ---------- */}
      <header className="course-header">
        <div className="header-content">
          <Link to="/">
            <img src={logoCourseCamp} alt="CourseCamp" className="logo" />
          </Link>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.3"
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Main ---------- */}
      <main className="main-content">
        <aside className="filters-section">
          <CourseFilters />
        </aside>

        <section className="courses-section">
          <div className="courses-header">
            <h2>Courses</h2>
            <span className="result-count">
              <strong>{filteredCourses.length}</strong> results
            </span>
          </div>

          <div className="courses-list">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>

      {/* ------------Footer----------*/}
      <Footer/>
    </div>
  );
}

export default CourseList;
