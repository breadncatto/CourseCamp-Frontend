  // --- CONTENT KHI ĐÁNH GIÁ (REVIEW) ---
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
            stroke={isFilled ? "#ffc107" : "#ddd"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            // onMouseEnter={() => setHoverRating(ratingValue)}
            // onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(ratingValue)}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      })}
    </div>
  );
};

  const ReviewContent = (
    {
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    reviewText,
    setReviewText,
    handleCloseReview,
    handleSubmitReview
    }
  ) => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8px', animation: 'fadeIn 0.3s' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '20px', color: '#333' }}>Your Feedback</h3>
      <p style={{ textAlign: 'center', marginBottom: '24px', color: '#666', fontSize: '14px' }}>How was your experience?</p>
      
      <StarRating rating={rating} setRating={setRating} hoverRating={hoverRating} setHoverRating={setHoverRating} />
      
      <textarea 
        rows="4" 
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Tell us what you liked or disliked..."
        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none', marginBottom: '20px', fontFamily: 'inherit', fontSize: '14px' }}
      />
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button onClick={handleCloseReview} style={{ padding: '8px 24px', border: '1px solid #ddd', borderRadius: '8px', background: 'white', cursor: 'pointer', color: '#555', fontWeight: '600' }}>Cancel</button>
        <button onClick={handleSubmitReview} style={{ padding: '8px 32px', border: 'none', borderRadius: '8px', background: '#5b84c1', color: 'white', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 6px rgba(91, 132, 193, 0.2)' }}>Submit</button>
      </div>
    </div>
  );

  export default ReviewContent;