import "./Post.css"
import React from 'react'
import Avatar from "@material-ui/core/Avatar";

function Post({username, caption, profilePic, image}) {
  return (
    <div className="post">
        <div className="post-header">
            <Avatar
                className="post-avatar" 
                alt="ok"
                src={profilePic}
            />
            <h2>{username}</h2>
        </div>
        <div className="post-img-container">
            <img
                className="post-img"
                src={image}
                alt="no"
            />
        </div>
        <h4 className="post-text">
            <strong>{username}</strong> {caption}
        </h4>
    </div>
  )
}

export default Post
