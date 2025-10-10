import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './component/Dashboard/home';
import Events from './component/Dashboard/events';
import About from './component/Dashboard/about';
import Login from './component/Dashboard/login';
import AdminPage from './component/Dashboard/admin_page';
import './App.css';
//import logoo from './Assets/logo12.png';
import ManageUsers from './component/Dashboard/manageUsers';
import Review from './component/Dashboard/review';
import ManageEvents from './component/Dashboard/manageEvent';
import Sidebar from './component/Dashboard/sidebar';
import HostEventForm from './component/Dashboard/hostEvent';
import Signup from './component/Dashboard/signup';
import Profile from './component/Dashboard/profile';
import Request from './component/Dashboard/request';
import RegisteredEvents from './component/Dashboard/registeredEvents';
import EventDetails from './component/Dashboard/eventDetails';
import UpdateEventForm from './component/Dashboard/updateEvent';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setIsAdmin(type === 'admin');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };

  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <Router>
      <MainContent 
        isLoggedIn={isLoggedIn} 
        isAdmin={isAdmin} 
        handleLogout={handleLogout} 
        onLogin={handleLogin} 
        hideNavbarRoutes={hideNavbarRoutes} 
        profileMenuVisible={profileMenuVisible}
        toggleProfileMenu={toggleProfileMenu}
      />
    </Router>
  );
}

function MainContent({ isLoggedIn, isAdmin, handleLogout, onLogin, hideNavbarRoutes, profileMenuVisible, toggleProfileMenu }) {
  const location = useLocation();

  const showNavbar = () => {
    if (hideNavbarRoutes.includes(location.pathname)) {
      return false;
    }
    return true;
  };

  return (
    <div className="fix">
      {showNavbar() && !isAdmin && (
        <nav className="navbar">

         <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">
              <span className="logo-event">Event</span>
              <span className="logo-ora">ora</span>
            </span>
          </Link>
          </div>

          <ul className="navbar-menu">
            {isLoggedIn && (
              <>
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="/events" className="navbar-link">Events</Link></li>
                <li><Link to="/about" className="navbar-link">About</Link></li>
                <li><Link to="/review" className="navbar-link">Review</Link></li>
                <li><Link to='/hostevent' className='navbar-link'>Host Event</Link></li>
                <li className="profile-menu">
                  <span onClick={toggleProfileMenu} className="navbar-link">Profile</span>
                  {profileMenuVisible && (
                    <ul className="profile-dropdown">
                      <li><Link to="/profile" className="navbar-link" onClick={toggleProfileMenu}>View Profile</Link></li>
                      <li><Link to='/login' onClick={() => { handleLogout(); toggleProfileMenu(); }} className="navbar-link">Logout</Link></li>
                    </ul>
                  )}
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li><Link to="/login" className="navbar-link">Login</Link></li>
            )}
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path='/update/:id' element={<UpdateEventForm/>}/>
        <Route path='/registered' element={<RegisteredEvents/>}/>
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path='/review' element={<Review />} />
        <Route path='/manageevents' element={<ManageEvents />} />
        <Route path='/manageUser' element={<ManageUsers/>}/>
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/request' element={<Request/>}/>
        <Route path='/hostevent' element={<HostEventForm />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/login" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event-details/:id" element={<EventDetails/>}/>
        {isAdmin && (
          <Route path="/admin/*" element={isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
