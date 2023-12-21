import React,{useState} from 'react';
import './login.css';
import { Link } from 'react-router-dom';
function Login()
{
    
    
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
        ...loginData,
        [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', loginData);
    };
    return(
        <div className="container">
            <div className="pic">
                <img src="https://images.ctfassets.net/2sam6k0rncvg/70AdJSPnZZbuI93ZDKrwz6/38119f4aa3318a4af787d1c3d5b16828/temporary-vehicle-registration-number.png?fm=webp&w=1200&q=75"  alt="summa"></img>
            </div>
            <div className="login-form">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">USERNAME:</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder='USERNAME'
                value={loginData.username}
                onChange={handleChange}
                required
            />

            <label htmlFor="password">PASSWORD:</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder='PASSWORD'
                value={loginData.password}
                onChange={handleChange}
                required
            />

            <button type="submit"><Link to="/service" className='Link'>Login</Link></button>
            <br></br>
            <Link to="/signup" className='Link'>Don't have an Account?SignUp Here</Link>
            </form>
            </div>
        </div>
    );
}
export default Login;