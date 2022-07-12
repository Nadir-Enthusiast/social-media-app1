import "./Comments.css"
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from "@material-ui/core";
import {db} from "./firebase"
import firebase from "firebase";

function Comments({postId, user, username, caption}) {
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
    <div className="comments">
        <div className="title">
            <Link to="/feed">
                <div className="title-btn">
                    <IconButton className="arrow">
                        <ArrowBackIcon />
                    </IconButton>
                </div>
            </Link>
            <h1>Comment Section</h1>
        </div>
        <div className="initial-post">
            <h1>{username} :</h1><p>&nbsp;&nbsp;{caption}</p>
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
        <div className="comments-interface">
            {comments.map((comment) => (
                <div className="comment">
                    <h2>{comment.username}</h2>
                    <p>{comment.text}</p>
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default Comments