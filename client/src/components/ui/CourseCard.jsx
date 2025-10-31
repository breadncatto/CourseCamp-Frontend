import React from "react";
import "./CourseCard.css"; 

function CourseCard({ course }) {
  return (
    <div className="courselist-card">
      <div className="card-content">
        <div className="card-text">
          <h3 className="course-title">{course.title}</h3>
          <p className="course-instructor">Prof. {course.instructor}</p>
          <p className="course-price">{course.price}</p>
          <div className="course-tags">
            {course.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <img src={course.image} alt={course.title} className="courselist-image" />
        <button className="btn btn-primary"> Detail</button>
      </div>
    </div>
  );
}

export default CourseCard;
