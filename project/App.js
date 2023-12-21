import React from 'react';
import Login from './login';
import Home from './home';
import About from './about';
import ServicePortal from './service';
import './App.css';
import SignUp from './signup';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
const App=()=>
{
  return(
    <div className="App">
      <Router>
         <nav>
          <img src='https://www.shutterstock.com/image-vector/auto-wave-lines-isolated-icon-600nw-1859685991.jpg' alt="img" className='logo'></img>
            <ul>
                <li>
                      <Link to="/">Home</Link>
                </li>
                <li>
                      <Link to="/service">Service</Link>
                </li>
                <li>
                      <Link to="/about">About</Link>
                </li>
                <li>
                      <Link to="/login">Login</Link>
                </li>
                <li>
                      <Link to="/signup">SignUp</Link>
                </li>
            </ul>
         </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/service' element={<ServicePortal />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
