import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {db, storage} from "../../firebase"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import "./PostUploader.css";

function PostUploader(user) {

  let navigate = useNavigate();

  const auth = getAuth();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleImage = (e) => {
    if(e.target.files[0]) {
        setImage(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, 'test@gmail.com', 'test1pass')
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("AFTER SIGN IN:")
            console.log(user)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    
    const uploadTask = uploadBytesResumable(ref(storage, `images/${image.name}`), image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred/snapshot.totalBytes)*100
        );
        setProgress(progress);
        console.log("Progress test reached!OK")
      },
      (error) => {
        console.log(error);
        alert(error)
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            addDoc(collection(db, "posts"), 
            {
              timestamp: serverTimestamp(),
              caption: caption,
              imageUrl: downloadURL,
              username: username
            })

            setProgress(0);
            setCaption("");
            setImage(null);
            console.log("Post must have been uploaded!OK")
          })
      }
    )
    navigate('/')
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
          placeholder='CoolUsername'   
        />
        <p>Enter the name that will be displayed on your post</p>

        {/* CAPTION */}
        <label htmlFor="caption">Caption</label>
        <input 
          id='caption'
          type='text' 
          placeholder='Some amazing caption!' 
          onChange={event => setCaption(event.target.value)}
          value={caption}
        />
        <p>Optional. Caption will be shown under the post</p>

        {/* ACTUAL UPLOAD */}
        <label htmlFor='picUpload'>Choose a picture to upload</label>
        <progress className='img-uploading' value={progress} max={100} />
        <input 
          id='picUpload' 
          type='file' 
          onChange={handleImage} 
        />
        <p>Required. To upload a post you must choose a picture</p>

        {/* SUBMIT */}
        <button onClick={(event) => handleUpload(event)}>Upload</button>

      </form>
    </div>
  )
}

export default PostUploader