import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendConfirmationEmail = (email, username) => {
    const templateParams = {
      to_email: email,
      to_name: username,
      message: 'Thank you for registering with Eventora! Your account has been created successfully.',
    };

    emailjs.send('service_grrc09p', 'template_2j8l23n', templateParams, '9qPVcliB0l4Hvmnc3')
      .then((response) => {
        console.log('Confirmation email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send confirmation email:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      alert('Invalid email format');
      return;
    }
    if (!phoneNumber.match(/^\d{10}$/)) {
      alert('Invalid phone number format');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, email, password, phoneNumber }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        sendConfirmationEmail(email, username);
        alert('Registration successful');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed: Network error or server not responding.');
      setLoading(false);
    }
  };

  return (
    <div className='signup-back'>
      <div className="signup-page">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
