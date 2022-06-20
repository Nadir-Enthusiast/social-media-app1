import "./Header.css"
import React from 'react'

function Header() {
  return (
    <div className="header">
        <div className="logo-container">
            <img
                className="logo-text"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                alt=""
            />
        </div>
    </div>
  )
}

export default Header
