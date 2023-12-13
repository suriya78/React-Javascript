import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
function Login()
{
    return(
        <div className="container">
            <div className="pic">
                <img src="https://images.ctfassets.net/2sam6k0rncvg/70AdJSPnZZbuI93ZDKrwz6/38119f4aa3318a4af787d1c3d5b16828/temporary-vehicle-registration-number.png?fm=webp&w=1200&q=75"  alt="summa"></img>
            </div>
            <div className="value">
            <h1>Login</h1>
            
                <label><b>USERNAME :  </b></label><input type="text" id="username" name="username" required/>
                <br></br>
                <label><b>PASSWORD :  </b></label><input type="password" id="password" name="username" required/>
                <br></br>
                <Link to ="/home"><button type="submit">Login</button></Link>             
                <div className='si'>
                <Link to ="/signup" className='link'>Don't have any account? Register here!</Link>
                </div>
            </div>
        </div>
    );
}
export default Login;