import React from 'react';
import './signup.css';
import { Link } from 'react-router-dom'; 
const SignUp=()=>
{
   function fun()
    {
        alert("Account Created Successfully")
    }
    return(
         <div className='container'>
            <div className='pic'>
                <img src="https://img.freepik.com/premium-photo/man-with-wrench-metal-gear_96743-362.jpg?w=996" alt="display"></img>
            </div>
            <div className='contain'>
                <h2 className='karthi'>SignUp</h2>
                <div className='val'>
                  <input type="email" placeholder='Email' required />
                </div>
                <div className='val'>
                   <input type="text" placeholder='Mobile No' required />
                </div>
                <div className='val'>
                   <input type="text" placeholder="Name" required />
                </div>
                <div className='val'>
                   <input type="password" placeholder='Password' required />
                </div>
                <div className='val'>
                <input type="password" placeholder='Password' required />
                </div>
                <Link to="/login"><button type="submit" onClick={fun}>Create Account</button></Link>
                <br></br>
                <br></br>
                <Link to ="/login" className='link'>If you are already a user!Loginhere</Link>
            </div>
         </div>
    );
}
export default SignUp;