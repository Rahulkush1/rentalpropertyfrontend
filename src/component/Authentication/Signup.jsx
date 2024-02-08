import React from 'react'
import "./SignUp.css"
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <>
       <div className="home_page_banner2"></div>
        <div className="custom-shape-divider-top-1706701667">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 0L0 0 892.25 114.72 1200 0z" className="shape-fill"></path>
            </svg>
        </div>
      <div className='SignUpPage'>
        <div id="login-box">
          <div className="left">
            <h1 className='my-3'>Sign up</h1>
            
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="email" placeholder="E-mail" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="password2" placeholder="Retype password" />
            
            <input type="submit" name="signup_submit" value="Sign me up" />
          </div>
          
          <div className="right">
            <span className="loginwith">Sign in with<br />social network</span>
            <Link to={'/login'}>
              <button className="social-signin gmail">Log in with Email</button>
            </Link>
            <button className="social-signin facebook">Log in with facebook</button>
            <button className="social-signin google">Log in with Google</button>

          </div>
          <div className="or">OR</div>
        </div>
      </div>
    </>
  )
}
export default Signup