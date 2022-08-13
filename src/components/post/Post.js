import React from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import {db} from "../../firebase";
import { doc, getDoc, deleteDoc} from 'firebase/firestore'
import { getStorage, ref, deleteObject } from "firebase/storage";
import edit from "../../images/edit.svg"
import trash from "../../images/trash.svg"

function Post({postId, username, caption, profilePic, image}) {
  
  let navigate = useNavigate();
  const storage = getStorage();

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

        <div className="post-text">
            <h5>{username}</h5>
            <p>{caption}</p>
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