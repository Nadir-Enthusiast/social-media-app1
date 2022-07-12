import "./Welcome.css"
import React from 'react'
import {Link} from "react-router-dom"

function Welcome() {
  return (
    <div className="welcome">
        <div className="title">
            <h1>Welcome to Social Media App</h1>
            <p>Choose an option to continue</p>
        </div>
        <div className="options">
            <button className="welcome-btn">
                <Link to='/feed' className="login-link">Use as a guest</Link>
            </button>
            <button className="welcome-btn">
                <Link to='/sign-up' className="login-link">Sign Up</Link>
            </button>
            <button className="welcome-btn">
                <Link to='/sign-in' className="login-link">Sign In</Link>
            </button>
        </div>
    </div>
  )
}

export default Welcome