import "./Post.css"
import React, { useEffect, useState } from 'react'
import Avatar from "@material-ui/core/Avatar";
import {db} from "./firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";

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
            {comments.slice(0,2).map((comment) => (
                <p>
                    <strong>{comment.username}</strong> {comment.text}
                </p>
            ))
            }
            <Link to={`/feed/comments/:${postId}`}><p>See all comments</p></Link>
        </div>
    </div>
  )
}

export default Post;