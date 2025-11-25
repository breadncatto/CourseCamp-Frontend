import React, { useState } from 'react';

const StarRating = ({ rating, setRating, hoverRating, setHoverRating }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hoverRating || rating);
        return (
          <svg 
            key={index}
            xmlns="http://www.w3.org/2000/svg" 
            width="32" height="32" viewBox="0 0 24 24" 
            fill={isFilled ? "#ffc107" : "none"} 
            stroke={isFilled ? "#ffc107" : "#333"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(ratingValue)}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      })}
    </div>
  );
};

const CourseCard = ({ title, level, price, image, description, tag, progress }) => {
  const isStudentCard = progress !== undefined;
  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleCloseReview = () => {
    setIsReviewing(false);
    setHoverRating(0);
  };

  const NormalContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <img src={image} alt={title} style={{ width: '100%', borderRadius: '8px', height: '180px', objectFit: 'cover' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '10px' }}>
        <span style={{ background: '#ffdecb', color: '#ff5b5c', padding: '4px 10px', borderRadius: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
          {tag || 'COURSE'}
        </span>
        <span style={{ color: '#a1acb8', fontWeight: '500' }}>{level}</span>
      </div>

      <h3 style={{ fontSize: '18px', color: '#384551', margin: '10px 0' }}>{title}</h3>
      
      <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
        {description}
      </p>

      <div style={{ marginTop: '15px' }}>
        {isStudentCard ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px', color: '#666' }}>
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden', marginBottom: '15px' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#5a8dee', borderRadius: '4px' }}></div>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => setIsReviewing(true)}
              style={{ padding: '6px 12px', fontSize: '13px', border: 'none', borderRadius: '5px', background: '#5a8dee', color: '#fff', cursor: 'pointer' }}
            >
              Rate
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{price ? price.toLocaleString() : 0} VND</span>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px', border: 'none', borderRadius: '5px', background: '#5a8dee', color: '#fff', cursor: 'pointer' }}>Manage</button>
          </div>
        )}
      </div>
    </div>
  );

  const ReviewContent = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>Share your Feedback</h3>
      <p style={{ textAlign: 'center', marginBottom: '10px', color: '#666' }}>How do you rate the quality of the course?</p>
      <StarRating rating={rating} setRating={setRating} hoverRating={hoverRating} setHoverRating={setHoverRating} />
      <p style={{ marginBottom: '8px', color: '#666', fontSize: '14px' }}>Can you tell us more?</p>
      <textarea 
        rows="4" 
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none', marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={handleCloseReview} style={{ padding: '8px 25px', border: '1px solid #ddd', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>Back</button>
        <button onClick={handleCloseReview} style={{ padding: '8px 30px', border: 'none', borderRadius: '5px', background: '#5a8dee', color: 'white', cursor: 'pointer' }}>Submit</button>
      </div>
    </div>
  );

  return (
    <div className="card course-card" style={{ height: '450px', background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 6px 0 rgba(67, 89, 113, 0.12)', transition: 'all 0.3s ease' }}>
      {isReviewing ? <ReviewContent /> : <NormalContent />}
    </div>
  );
};

export default CourseCard;