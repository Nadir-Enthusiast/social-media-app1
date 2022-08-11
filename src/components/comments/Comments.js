import "./Comments.css"
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import {db} from "../../firebase"
import { updateDoc, serverTimestamp, query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";

function Comments({postId, user, username, caption}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    const q = query(collection(db, `posts/${postId}/comments`,), orderBy("timestamp", "desc"), limit(1000))
    if (postId) {
        unsubscribe = onSnapshot(q, (snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
        unsubscribe();
    };
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();

    updateDoc((db, "posts", postId, "comments"), {
        text: comment,
        username: user.displayName,
        timestamp: serverTimestamp(),
    })
    setComment('');

  }

  return (
    <div className="comments">
        <div className="title">
            <Link to="/">
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