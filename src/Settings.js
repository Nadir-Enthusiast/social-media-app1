import "./Settings.css"
import React from 'react'
import BuildIcon from '@material-ui/icons/Build';

function Settings() {
  const dropdownLaunch = (event, option) => {
    if(document.getElementById(option).style.height === "fit-content") {
      return (document.getElementById(option).style.height = "0")
    } else {
      return (document.getElementById(option).style.height = "fit-content")
    }
  }

  return (
    <div className="settings">
        {/* title */}
        <div className="settings-header">
          <BuildIcon className="settings-icon" />
          <h1>Settings</h1>
        </div>

        {/* body */}
        <div className="settings-content">
          
          {/* account */}
          <button className="dropdown-btn" onClick={event => dropdownLaunch(event, "account")} >
            <h3>Account</h3>
          </button>
          <div className="settings-option" id="account">
            <a>Username</a>
            <a>Password</a>
            <a>E-mail</a>
          </div>

          {/* customization */}
          <button className="dropdown-btn" onClick={event => dropdownLaunch(event, "customization")}>
            <h3>Customization</h3>
          </button>
          <div className="settings-option" id="customization">
            <a>Background</a>
            <a>Nickname styling</a>
            <a>Font size</a>
          </div>
          
          {/* help */}
          <button className="dropdown-btn" onClick={event => dropdownLaunch(event, "help")}>
            <h3>Help</h3>
          </button>
          <div className="settings-option" id="help" >
            <a>FAQ</a>
            <a>Short Guide</a>
            <a>Report an issue</a>
          </div>

          {/* contact */}
          <button className="dropdown-btn" onClick={event => dropdownLaunch(event, "contact")}>
            <h3>Contact</h3>
          </button>
          <div className="settings-option" id="contact" >
            <a>Suggest your idea</a>
            <a>Ask a question</a>
            <a>Feedback</a>
            <a>Reach out</a>
          </div>

        </div>
        {/* footer */}
        <div className="settings-footer">
          <p>Thanks for attention. Doing best to improve services</p>
        </div>
    </div>
  )
}

export default Settings