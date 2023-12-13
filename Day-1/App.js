import React from 'react';
import Login from './login';
import SignUp from './signup';
import './App.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
const App=()=>
{
  return(
    <div className="App">
      <Router>
         <nav>
            <ul>
                <li>
                      <Link to="/home"><b>Home</b></Link>
                </li>
                <li>
                      <Link to="/about"><b>About</b></Link>
                </li>
                <li>
                      <Link to="/login"><b>Login</b></Link>
                </li>
                <li>
                      <Link to="/signup"><b>SignUp</b></Link>
                </li>
            </ul>
         </nav>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
