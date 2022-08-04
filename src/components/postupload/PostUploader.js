import firebase from 'firebase';
import React, { useState } from 'react'
import {db, storage} from "../../firebase"
import "./PostUploader.css";

function PostUploader() {
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
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred/snapshot.totalBytes)*100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error)
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            })

            setProgress(0);
            setCaption("");
            setImage(null);
          })
      }
    )
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
        <button onClick={handleUpload}>Upload</button>

      </form>
    </div>
  )
}

export default PostUploader