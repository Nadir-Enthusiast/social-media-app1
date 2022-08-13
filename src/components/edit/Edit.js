import "./Edit.css"
import React,{useState} from 'react'
import {db} from '../../firebase'
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Edit(targetId) {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const docRef = doc(db, 'posts/' + targetId.targetId.slice(1));

  const handleChanges = (e) => {
    e.preventDefault()
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        setDoc(docRef, {
          username: username,
          caption: caption,
          imageUrl: docSnap.data().imageUrl,
          timestamp: docSnap.data().timestamp
        });
      }
    })
    setUsername('');
    setCaption('');
    navigate('/');
  }

  return (
    <div className='post-upload'>

      <div className="form">
        {/* USERNAME */}
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text" 
          placeholder='Change username'
          onChange={event => setUsername(event.target.value)} 
          value={username}
        />
        <p>Change the name that is displayed on your post</p>
      </div>

      <div className="form">
        {/* CAPTION */}
        <label htmlFor="caption">Caption</label>
        <input 
          id='caption'
          type='text' 
          placeholder='Change caption' 
          onChange={event => setCaption(event.target.value)}
          value={caption}
        />
        <p>Change/Add caption</p>
      </div>

      <div className="form">
        {/* SUBMIT */}
        <button onClick={(event) => handleChanges(event)}>Apply changes</button>
      </div>
  </div>
  )
}

export default Edit