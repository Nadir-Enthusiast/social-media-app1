import "./Posts.css";
import React from "react";
import "firebase/auth"
import Post from './Post';
import PostUploader from "./PostUploader";

function Posts({user, posts}) {
  return (
    <div>
        { user?.displayName ? (
          <div className="post-upload" >
            <h3>Upload your post</h3>
            <PostUploader username={user.displayName} />
          </div>
          ) : (
            <div className="post-login">
              <h3>Log In or Sign Up to upload posts.</h3>
            </div>
          )
        }
        <div className="posts">
        {
          posts.map(({id, post}) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              profilePic={post.profilePic}
              image={post.imageUrl}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Posts