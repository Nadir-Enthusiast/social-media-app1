import "./Profile.css"
import React from 'react'

function Profile() {
  return (
    <div className="profile">
        <div className="profile-avatar">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" 
            alt="" />
        </div>
        <div className="profile-text">
          <p>Full Name: </p>
          <h1>First Middle Sur- Names</h1>
          <p>Username: </p>
          <h3>Any</h3>
          <p>Gender: </p>
          <h3>Demo</h3>
          <p>Age: </p>
          <h3>Random</h3>
        </div>
    </div>
  )
}

export default Profile