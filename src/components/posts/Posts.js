import "./Posts.css";
import "../post/Post.css"
import React from "react";
import Post from '../post/Post';

function Posts({user, posts}) {
  return (
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
  )
}

export default Posts