import "./Profile.css"
import React, { useState } from 'react'

function Profile({user}) {
  return (
    <>
      {user?.email !== undefined ? 
      <div className="profile">
        <div className="profile-avatar">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" 
            alt="" />
        </div>
        <div className="profile-text">
          <p>Username </p>
          <h1>{user.displayName}</h1>
          <p>E-mail </p>
          <h3>{user.email}</h3>
          <p>Gender: </p>
          <h3>Not specified</h3>
          <p>Age: </p>
          <h3>Not specified</h3>
        </div>
      </div>
      : <h1>Using as a guest</h1>
    }
    </>
  )
}

export default Profile