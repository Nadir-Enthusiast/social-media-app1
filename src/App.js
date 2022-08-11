import './App.css';
import React,{useState, useEffect} from "react";
import Posts from "./components/posts/Posts";
import Header from './components/header/Header';
import {BrowserRouter as Router, Route, Routes, useParams} from "react-router-dom"
import Comments from './components/comments/Comments';
import {db} from "./firebase"
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import PostUploader from './components/postupload/PostUploader';
import Edit from './components/edit/Edit';

function App() {
  const auth = getAuth();
  // defining posts
  const [posts, setPosts] = useState([]);
  // set user for all routes
  const [user, setUser] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy("timestamp", "desc"), limit(1000));
    onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  },[])

  // -------------------------------------Components-----------------------------------------

  function HomePage() {
    return(
      <div>
        <Header />
        <Posts 
          className="posts-mainPage"
          user={user}
          posts={posts} 
        />
      </div>
    )
  }

  function CommentsPage() {
    return(
      <div>
        <Header />
        <CommentsManage user={user} posts={posts} />
      </div>
    )
  }

  function UploadPage() {
    return(
      <div>
        <Header />
        <PostUploader user={user} />
      </div>
    )
  }

  function EditPage() {
    let {pid} = useParams()
    return(
      <div>
        <Header />
        <Edit targetId={pid} />
      </div>
    )
  }
  // ----------------------------------End of Components----------------------------------

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route element={<UploadPage />} path="/upload" />
          <Route element={<CommentsPage />} path="/feed/comments/:cid" />
          <Route element={<EditPage />} path="/post/:pid" />
          <Route element={<HomePage />} path="/" />
        </Routes>
      </div>
    </Router>
  );
}

function CommentsManage({user, posts}) {
  let { cid } = useParams();

  return(
    (
      posts.map(({id, post}) => (
        (id===cid.slice(1)? 
        <Comments
          key={id}
          postId={id}
          user={user}
          username={post.username}
          caption={post.caption}
        /> : '')
      ))
    )
  )
}

export default App;