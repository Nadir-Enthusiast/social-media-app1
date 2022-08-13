import "./Header.css"
import React from 'react'
import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo-text"
          src="https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
        <h3>Social Media app</h3>
      </div>
      <a href="/upload">Upload a post</a>
      <Link to="/"><h3>Home page</h3></Link>
    </div>
  )
}

export default Header