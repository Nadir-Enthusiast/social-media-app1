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
      <form>
        {/* USERNAME */}
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id="username" 
          onChange={event => setUsername(event.target.value)} 
          placeholder='Change username'   
          value={username}
        />
        <p>Change the name that is displayed on your post</p>

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

        {/* SUBMIT */}
        <button onClick={(event) => handleChanges(event)}>Apply changes</button>

      </form>
  </div>
  )
}

export default Edit