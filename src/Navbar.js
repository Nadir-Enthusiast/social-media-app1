import "./Navbar.css"
import React from 'react'
import {useHistory} from "react-router-dom"
import HomeIcon from "@material-ui/icons/Home"
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {IconButton} from "@material-ui/core"

function Navbar() {

  const history = useHistory();

  const RedirectNavbar = (route) => {
    history.push(route)
  }
  
  const closeNav = () => {
    document.getElementById("target-navbar").style.width = "0";
  }

  return (
    <div className="navbar-wrap">
      <div className="navbar" id="target-navbar">
        <button className="close-nav-btn" onClick={closeNav}>&times;</button>
        <IconButton className="icon-btn" onClick={(event) => RedirectNavbar("/feed")}>
          <HomeIcon />
        </IconButton>
        <IconButton className="icon-btn" onClick={(event) => RedirectNavbar("/search")}>
          <SearchIcon />
        </IconButton>
        <IconButton className="icon-btn" onClick={(event) => RedirectNavbar("/chats")}>
          <ChatIcon />
        </IconButton>
        <IconButton className="icon-btn" onClick={(event) => RedirectNavbar("/settings")}>
          <SettingsIcon />
        </IconButton>
        <IconButton className="icon-btn" onClick={(event) => RedirectNavbar("/profile")}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Navbar