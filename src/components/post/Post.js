import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import {db} from "../../firebase";
import { onSnapshot, query, collection, doc, getDoc, deleteDoc, orderBy, limit} from 'firebase/firestore'
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
import edit from "./edit.svg"
import trash from "./trash.svg"

function Post({postId, user, username, caption, profilePic, image}) {
  
  let navigate = useNavigate();
  const storage = getStorage();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
        const q = query(collection(db, `posts/${postId}/comments`), orderBy("timestamp", "desc"), limit(1000));
        unsubscribe = onSnapshot(q, (snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
    }

    return () => {
        unsubscribe();
    };
  }, [postId])

  const handleDelete = (e) => {
    try {
        var respond = prompt("Are you sure (to delete enter yes)?").toLowerCase();
        if(respond==="yes"){

            const docRef = doc(db, 'posts/' + postId);
            getDoc(docRef).then(docSnap => {
              if (docSnap.exists()) {
                const targetFile = ref(storage, `${docSnap.data().imageUrl}`);
                deleteObject(targetFile).then(() => {
                  deleteDoc(doc(db, "posts", postId));
                }).catch((error) => {
                  console.warn(error)
                });
              }
            })

        } else {
            window.alert("File was NOT deleted")
        }
    } catch (error) {
        window.alert("Operation was cancelled")
    }
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
        <div className="tools">
            <button
                id='edit-btn'
                type='button'
                onClick={e => navigate(`/post/:${postId}`)}
            >
                <img src={edit} alt="" className="tool-pic" />
                <p>Edit post</p>
            </button>
            <button
                id='del-btn'
                type='button'
                onClick={e => handleDelete(e, postId)}
            >
                <img src={trash} alt="" className="tool-pic" />
                <p>Delete post</p>
            </button>
        </div>
    </div>
  )
}

export default Post;