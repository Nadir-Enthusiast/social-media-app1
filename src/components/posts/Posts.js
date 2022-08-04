import "./Posts.css";
import "../post/Post.css"
import React from "react";
import "firebase/auth"
import Post from '../post/Post';

function Posts({posts}) {
  return (
    <div>
      <div className="posts">
        {
          posts.map(({id, post}) => (
            <Post
              key={id}
              postId={id}
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