import "./Header.css"
import React from 'react'

function Header() {
  return (
    <div className="header">
      <div className="contents">
        <div className="logo-container">
          <img
            className="logo-text"
            src="https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
          <h3>Social Media app</h3>
        </div>
        <div className="header-text">
          <h3>Developed by Nadir</h3>
        </div>
      </div>
    </div>
  )
}

export default Header