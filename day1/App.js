import './App.css';
import React, {useState, useEffect} from "react";
import Header from './components/header/Header';
import Post from './components/post/Post';
import { doc, onSnapshot, collection, query } from "firebase/firestore";
import {db} from "./firebase";

function App() {

  const [q, setPosts] = useState([
    {
      username: "thisPlaceholder",
      caption: "some comment",
      profilePic: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
      image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      username: "somedude",
      caption: "interesting",
      profilePic: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      username: "oneperson",
      caption: "well , maybe",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600",
      image: "https://images.pexels.com/photos/4022082/pexels-photo-4022082.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
  ]);
  useEffect(() => {
    //const q = query(collection(db, "43563208578864"))
    const unsub = onSnapshot(doc(db, "43563208578864"), (doc) => {
      setPosts(doc.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
    ;
  }, [])

  return (
    <div className="app">
      <Header />

      {
        q.map(({id, post}) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            profilePic={post.profilePic}
            image={post.image}
          />
        ))
      }
    </div>
  );
}

export default App;
