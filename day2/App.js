import './App.css';
import React, {useState, useEffect} from "react";
import Header from './Header';
import Post from './Post';
import PostUploader from "./PostUploader";
import {db, auth} from "./firebase";
import { Button, Input, makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";


// ------------ NECESSARY FUNCTIONS ---------------
function getModalStyle() {
  const top = 50;
  const left = 50;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// --------------------- MAIN APP -------------------------

function App() {
  const classes  = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  // ------------------- SIGN UP SETTINGS ------------------
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // --------------------- USE EFFECT -----------------------
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, password])

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  },[])

  // --------------------- FUNCTIONS ------------------------

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((err) => alert(err.message))

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message))

    setOpenSignIn(false);
  }

  // ----------------------- APP ---------------------------
  return (
    <div className="app">
      {/* ---------------- SIGN UP MODAL ----------------- */}
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div className="img-container" style={{textAlign: 'center'}}>
              <img
                style={{width: '300px'}}
                className='signUp-logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
                alt=''
              />
              <img
                style={{width: '150px'}}
                className='signUp-logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/640px-Instagram-Icon.png'
                alt=''
              />
            </div>
          </center>
          <form>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      {/* ---------------- SIGN IN MODAL ----------------- */}
      <Modal
        open={openSignIn}
        onClose={() => {setOpenSignIn(false)}}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div className="img-container" style={{textAlign: 'center'}}>
              <img
                style={{width: '300px'}}
                className='signUp-logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
                alt=''
              />
              <img
                style={{width: '150px'}}
                className='signUp-logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/640px-Instagram-Icon.png'
                alt=''
              />
            </div>
          </center>
          <form>
            <h1>SIGN IN</h1>
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
      {/*------------------------ INTERFACE ---------------------------*/}
      <Header />
      {user ? (
        <Button onClick={() => auth.signOut()}>Log Out</Button>
      ): (
        <div className="login-container">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      ) }
      {/*
      { user?.displayName ? (
        <PostUploader username={user.displayName} />
        ) : (
          <div className="post-login-needed-container">
            <h3>Log In or Sign Up to upload posts.</h3>
          </div>
        )
      }
    */}
      {
        posts.map(({id, post}) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            profilePic={post.profilePic}
            image={post.imageUrl}
          />
        ))
      }
      { user?.displayName ? (
        <PostUploader username={user.displayName} />
        ) : (
          <div className="post-login-needed-container">
            <h3>Log In or Sign Up to upload posts.</h3>
          </div>
        )
      }
    </div>
  );
}

export default App;
