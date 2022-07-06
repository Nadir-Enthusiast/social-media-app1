import "./Post.css"
import React, { useEffect, useState } from 'react'
import Avatar from "@material-ui/core/Avatar";
import {db} from "./firebase";
import firebase from "firebase";

function Post({postId, user, username, caption, profilePic, image}) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');


  useEffect(() => {
    let unsubscribe;
    if (postId) {
        unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
    }

    return () => {
        unsubscribe();
    };
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setComment('');

  }

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
        
        <div className="post-comments">
            {comments.map((comment) => (
                <p>
                    <strong>{comment.username}</strong> {comment.text}
                </p>
            ))
            }
        </div>

        {user && (
        <form className="post-comment-container">
            <input
                className="type-comment"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                className="comment-btn"
                disabled={!comment}
                type="submit"
                onClick={postComment}
            >
                Post
            </button>
        </form>)}
    </div>
  )
}

export default Post