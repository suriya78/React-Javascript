import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './sidebar.css'; 

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/login');
  };

  return (
    <div className="sidebar">
        
    <ul>
      <li><Link to="/manageUser" className='eve'>Manage User</Link></li>
      <li><Link to="/manageevents">Manage Events</Link></li>
      <li><Link to="/request">Requests</Link></li>
      <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
    </ul>
  </div>
  );
}

export default Sidebar;
