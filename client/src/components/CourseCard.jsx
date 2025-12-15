import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook điều hướng
import { useAuth } from '../context/AuthContext';
import ReviewContent from './ReviewContent';

// Component đánh giá sao

const CourseCard = ({ id, title, level, price, image, description, tag, progress }) => {
  const navigate = useNavigate(); // Hook chuyển trang
  const isStudentCard = progress !== undefined;
  
  // State quản lý chế độ Review (Modal ngay trong card)
  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const { user } = useAuth();
  const handleCloseReview = () => {
    setIsReviewing(false);
    setHoverRating(0);
    setRating(0);
    setReviewText('');
  };

  const handleSubmitReview = (rating, reviewText) => {
    try {
      // Gửi đánh giá lên với user_id tương ứng và course_id tương ứng
      alert(`Người dùng ${user.user_id} đánh giá khóa học ${id} thành công`);
      setIsReviewing(false);
      setHoverRating(0);
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert("Đánh giá thất bại. Vui lòng thử lại.");
      // setIsReviewing(false);
      // setHoverRating(0);
      // setRating(0);
      // setReviewText('');
    }
  }
  // Xử lý chuyển hướng sang trang bài học
  const handleStartLearning = () => {
    // Điều hướng đến đường dẫn chi tiết khóa học, ví dụ: /learn/1
    alert("Chuyển hướng sang trang học hành")
  };

  // --- CONTENT CHÍNH CỦA CARD ---
  const NormalContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Hình ảnh */}
      <div style={{ position: 'relative', height: '180px', marginBottom: '16px' }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
      </div>
      
      {/* Tag và Level */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span className="course-tag">
          {tag || 'COURSE'}
        </span>
        <span style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>{level}</span>
      </div>

      {/* Tiêu đề */}
      <h3 style={{ fontSize: '18px', color: '#1e293b', margin: '0 0 8px 0', fontWeight: '700', lineHeight: '1.4' }}>{title}</h3>
      
      {/* Mô tả (Flex 1 để đẩy phần footer xuống đáy) */}
      <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', flex: 1, marginBottom: '20px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
        {description}
      </p>

      {/* Footer: Progress bar + Buttons */}
      <div style={{ marginTop: 'auto' }}>
        {isStudentCard ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#64748b', fontWeight: '500' }}>
              <span>Completed</span>
              <span>{progress}%</span>
            </div>
            
            {/* Thanh tiến độ */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#5b84c1', borderRadius: '10px', transition: 'width 0.5s ease' }}></div>
            </div>

            {/* Khu vực nút bấm */}
            <div className="card-actions">
               {/* Nút vào học */}
              <button 
                className="btn-learn"
                onClick={handleStartLearning}
              >
                {progress > 0 ? 'Continue Learning' : 'Start Learning'}
              </button>
              
              {/* Nút mở Review */}
              <button 
                className="btn-rate" 
                onClick={() => setIsReviewing(true)}
                title="Rate this course"
              >
                ⭐ Rate
              </button>
            </div>
          </>
        ) : (
          // Giao diện cho thẻ chưa mua (nếu cần dùng chung)
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#5b84c1' }}>{price ? price.toLocaleString() : 0} VND</span>
            <button className="btn btn-primary" style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#5b84c1', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Manage</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="course-card" style={{ 
      /* Style khung thẻ */
      height: '100%', /* Quan trọng để fill Grid */
      minHeight: '440px', 
      background: '#fff', 
      borderRadius: '16px', 
      padding: '24px', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(91, 132, 193, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      }}
    >
      {isReviewing ? <ReviewContent rating={rating} setRating={setRating} hoverRating={hoverRating} setHoverRating={setHoverRating} reviewText={reviewText} setReviewText={setReviewText} handleCloseReview={handleCloseReview} handleSubmitReview={handleSubmitReview}/>
       : <NormalContent />}
    </div>
  );
};

export default CourseCard;