import "./Posts.css";
import "../post/Post.css"
import React from "react";
import "firebase/auth"
import Post from '../post/Post';
import PostUploader from "../postupload/PostUploader";

function Posts({posts}) {
  const username = 'none';
  return (
    <div>
      <div className="post-upload" >
        <h3>Upload your post</h3>
        <PostUploader username={username} />
      </div>
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