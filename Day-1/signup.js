import React from 'react';
import './signup.css';
import { Link } from 'react-router-dom'; 
const SignUp=()=>
{
    return(
         <div className='container'>
            <div className='pic'>
                <img src="https://img.freepik.com/premium-photo/man-with-wrench-metal-gear_96743-362.jpg?w=996" alt="display"></img>
            </div>
            <div className='contain'>
                <h1>SignUp</h1>
                <div className='val'>
                  <label><b>EMAIL : </b></label>
                  <input type="email" />
                </div>
                <div className='val'>
                   <label><b>VECHILE NO : </b></label>
                   <input type="text" />
                </div>
                <div className='val'>
                   <label><b>USERNAME: </b></label>
                   <input type="text" />
                </div>
                <div className='val'>
                   <labe><b>NEW PASSWORD:</b></labe>
                   <input type="password" />
                </div>
                
                <labe><b>CONFIRM PASSWORD:</b></labe><input type="password" />
                <Link to="/home"><button type="submit">Register</button></Link>
                <br></br>
                <Link to ="/login" className='link'>If you are already a user!Loginhere</Link>
            </div>
         </div>
    );
}
export default SignUp;