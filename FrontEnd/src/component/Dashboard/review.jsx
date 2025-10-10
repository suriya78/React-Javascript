import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './review.css';
import rew from '../pics/feedback.jpg';

const Review = () => {
  const [newReview, setNewReview] = useState({
    user: '',
    email: '',
    rating: 1,
    comment: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleStarClick = (rating) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      rating: rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newReview.user && newReview.email && newReview.comment) {
      emailjs.send('your_service_id', 'your_template_id', {
        user: newReview.user,
        email: newReview.email,
        rating: newReview.rating,
        comment: newReview.comment,
      }, 'your_user_id')
        .then((response) => {
          setSubmissionMessage('Thank you for your review! It has been sent to your email.');
          setNewReview({
            user: '',
            email: '',
            rating: 1,
            comment: '',
          });
        })
        .catch((error) => {
          setSubmissionMessage('Failed to send review. Please try again.');
        });
    } else {
      setSubmissionMessage('Please fill out all fields before submitting.');
    }
  };

  return (
    <div className='review-container'>
      <div className="review-form">
        <h2>Submit Your Review</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="user"
              value={newReview.user}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newReview.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Rating:
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${newReview.rating >= star ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </label>
          <label>
            Comment:
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit Review</button>
        </form>
        {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
      </div>
      <div className="review-image">
        <img src={rew} alt="Decorative" />
      </div>
    </div>
  );
};

export default Review;
