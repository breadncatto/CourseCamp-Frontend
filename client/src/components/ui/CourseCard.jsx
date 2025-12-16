import React from "react";
import "./CourseCard.css"; 
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helper/util.js";

function CourseCard({ course }) {
  const navigate = useNavigate();

  // Hàm format giá tiền sang VND (VD: 1.500.000 đ)
  // const formatCurrency = (value) => {
  //   if (!value) return "0 đ";
  //   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  // };

  // Safe check để tránh lỗi crash nếu instructors bị null
  const instructorName = course.instructors?.instructor_name || "Unknown Instructor";

  return (
    <div className="courselist-card">
      {/* 1. Phần Ảnh (Có xử lý Fallback) */}
      <div className="card-image-wrapper">
        {course.thumbnail_url ? (
          <img 
            src={course.thumbnail_url} 
            alt={course.title} 
            className="courselist-image" 
            onError={(e) => { // Xử lý nếu link ảnh bị chết (404)
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'flex'; 
            }}
          />
        ) : null}
        
        {/* Placeholder hiển thị khi không có ảnh hoặc ảnh lỗi */}
        <div 
            className="placeholder-image" 
            style={{ display: course.thumbnail_url ? 'none' : 'flex' }}
        >
          <span>No Image Available</span>
        </div>
      </div>

      {/* 2. Phần Nội dung Text */}
      <div className="card-content">
        <h3 className="course-title" title={course.title}>{course.title}</h3>
        
        <p className="course-instructor">
          Giảng viên: {instructorName}
        </p>
        
        <div className="course-tags">
          {course.level && <span className={`course-tag tag-${course.level.toLowerCase()}`}>{course.level}</span>}
          {course.category_name && <span className="course-tag">{course.category_name}</span>}
        </div>
      </div>

      {/* 3. Phần Footer (Giá + Nút) */}
      <div className="course-card-footer">
        <span className="course-price">{formatCurrency(course.price)}</span>
        <button 
          className="btn-detail" 
          onClick={() => navigate(`/course/${course.course_id}`)}
        >
          View Detail
        </button>
      </div>
    </div>
  );
}

export default CourseCard;