import "./Info.css"
import React from 'react'
import css from '../../images/css-icon.svg'
import firebase from '../../images/firebase-icon.svg'
import html from '../../images/html-icon.svg'
import javascript from '../../images/javascript.svg'
import mui from '../../images/mui-icon.svg'
import reactIcon from '../../images/react-icon.svg'

function Info() {
  return (
    <div className="info">
        <h1>What can this website do?</h1>
        <h2>Create posts</h2>
        <p>Click upload post and create post by filling inputs and uploading a picture.</p>
        <h2>Edit posts</h2>
        <p>Press edit button and provide a new username and a caption to change the post you chose.</p>
        <h2>Delete posts</h2>
        <p>Press delete button and confirm your choice in order to delete a post.</p>
        <div className="footer">
            <div className="wrapper">
                <p id="a">Website created with</p>
                <img 
                    id="e"
                    className="icon"
                    src={reactIcon}
                    alt=""
                />
            </div>
            <div className="wrapper">
                <p id="b">Database and cloud platform provided by</p>
                <img 
                    id="f"
                    className="icon"
                    src={firebase}
                    alt=""
                />
            </div>
            <div className="wrapper">
                <p id="c">Styling implemented with</p>
                <img 
                    id="g"
                    className="icon"
                    src={css}
                    alt=""
                />
                <img 
                    id="h"
                    className="icon"
                    src={mui}
                    alt=""
                />
            </div>
            <div className="wrapper">
                <p id="d">Languages used</p>
                <img 
                    id="i"
                    className="icon"
                    src={javascript}
                    alt=""
                />
                <img 
                    id="j"
                    className="icon"
                    src={html}
                    alt=""
                />
            </div>
        </div>
    </div>
  )
}

export default Info