import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login({ onLogin }) {
  const [loginType, setLoginType] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginType === 'admin') {
        if (username === 'admin' && password === '12') {
          console.log('Admin Login Successful');
          onLogin('admin');
          navigate('/admin');
        } else {
          alert('Invalid admin credentials');
        }
      } else {
        const response = await fetch(`http://localhost:8080/users/get/${username}/${password}`);

        if (response.ok) {
          const data = await response.json(); // Ensure the response contains userId
          console.log('User Login:', data);

          // Assuming data contains userId
          const userId = data.userId; 
          localStorage.setItem('user_id', userId); // Store userId in localStorage

          onLogin('user');
          navigate('/');
        } else {
          alert('Invalid user credentials');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed: Network error or server not responding.');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className='back'>
      <div className="login-page">
        <h2>{loginType === 'admin' ? 'Admin Login' : 'User Login'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="loginType">Login Type:</label>
            <select id="loginType" value={loginType} onChange={handleLoginTypeChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      </div>
    </div>
  );
}

export default Login;
