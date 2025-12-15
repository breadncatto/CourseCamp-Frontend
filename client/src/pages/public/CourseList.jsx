import { useEffect, useState } from "react";
import "./CourseList.css";
import logoCourseCamp from "../../assets/logo-coursecamp.png";
import CourseFilters from "../../components/ui/CourseFilters.jsx";
import CourseCard from "../../components/ui/CourseCard.jsx";
import { Link } from "react-router-dom";
import Footer from "../../components/ui/Footer.jsx";
import Header from "../../components/ui/Header.jsx";
import { getCourses } from "../../api/courseService.js";

function CourseList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // const courses = [
  //   {
  //     id: 1,
  //     title: "Intro to Python",
  //     instructor: "Prof. Alex",
  //     price: "1.140.000 VND",
  //     image:
  //       "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
  //     tags: ["Programming", "Beginner"],
  //   },
  //   {
  //     id: 2,
  //     title: "Web UI with React",
  //     instructor: "Prof. Sarah",
  //     price: "3.290.000 VND",
  //     image:
  //       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  //     tags: ["Frontend", "Intermediate"],
  //   },
  //   {
  //     id: 3,
  //     title: "Data Science Fundamentals",
  //     instructor: "Prof. John",
  //     price: "2.500.000 VND",
  //     image:
  //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  //     tags: ["Data Science", "Beginner"],
  //   },
  // ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        console.log(response.meta);
        if(response && response.meta) {
          setCourses(response.meta);
          setFilteredCourses(response.meta);
          console.log(courses);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // const filteredCourses = courses.filter((course) =>
  //   course.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleSearch = (e) => {
    // e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredCourses(courses);
      return;
    }

    const results = courses.filter((course) =>course.title.toLowerCase().includes(searchQuery.toLowerCase()));

    setFilteredCourses(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="course-page">
      <Header />
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
              onKeyDown={handleKeyDown}
              className="search-input"
            />
            <button className="search-btn" onClick={handleSearch}>
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
      <main className="course-main-layout">
        <aside className="filters-section">
          <CourseFilters />
        </aside>

        <section className="courses-section">
          <div className="courses-header">
            <h2>Courses</h2>
            <span className="result-count">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <strong>{filteredCourses.length}</strong> results
                </>
              )}
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              Đang tải danh sách khóa học...
            </div>
          ) : (
            <div className="courses-list">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.course_id} course={course} />
                ))
              ) : (
                <p>Không tìm thấy khóa học nào phù hợp.</p>
              )}
            </div>
          )}
        </section>
      </main>

      {/* ------------Footer----------*/}
      <Footer/>
    </div>
  );
}

export default CourseList;
