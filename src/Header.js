import "./Header.css"
import React, {useState, useEffect} from 'react'
import {auth} from "./firebase";
import { Button, Input, makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Navbar from "./Navbar";

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

function Header() {
  const classes  = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
    if(user && username) {
      user.updateProfile({
        displayName: username
      })
    }
  },[user, username])

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

  const openNav = () => {
    document.getElementById("target-navbar").style.width = "78px";
  }

  return (
    <div className="header">
      {/* ---------------- SIGN UP MODAL ----------------- */}
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div className="img-container" style={{textAlign: 'center'}}>
              <h1>Social Media App</h1>
              <img
                style={{width: '300px'}}
                className='signUp-logo'
                src='https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
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
              <h1>Social Media App</h1>
              <img
                style={{width: '300px'}}
                className='signUp-logo'
                src='https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
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
      {/*------------------------ HEADER CONTAINER ---------------------------*/}
      <div className="header">
          <button className="open-nav-btn" onClick={openNav}>&#9776;</button>
        <div className="contents">
          <div className="logo-container">
            <img
              className="logo-text"
              src="https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
            <h3>Social Media app</h3>
          </div>
          <div className="header-text">
            <h3>Developed by Nadir</h3>
          </div>
          <div className="login-container">
            {user ? (
              <Button className='login-btn' onClick={() => auth.signOut()}>Log Out</Button>
            ): (
              <div className="guest-login-container">
                <Button className='login-btn' onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button className='login-btn' onClick={() => setOpen(true)}>Sign Up</Button>
              </div>
          ) }
          </div>
        </div>
        <Navbar />
      </div>
        
    </div>
  )
}

export default Header