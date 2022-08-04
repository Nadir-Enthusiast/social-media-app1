import './App.css';
import React,{useState, useEffect} from "react";
import Posts from "./components/posts/Posts";
import Header from './components/header/Header';
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom"
import Comments from './components/comments/Comments';
import {db} from "./firebase"
import PostUploader from './components/postupload/PostUploader';

function App() {
  // defining posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  },[])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/upload'>
            <Header />
            <PostUploader />
          </Route>
          <Route path='/feed/comments/:cid'>
            <Header />
            <CommentsManage posts={posts} />
          </Route>
          {/* default feed route */}
          <Route path='/'>
            <Header />
            <Posts 
              className="posts-mainPage"
              posts={posts} 
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function CommentsManage({posts}) {
  let { cid } = useParams();

  return(
    (
      posts.map(({id, post}) => (
        (id===cid.slice(1)? 
        <Comments
          key={id}
          postId={id}
          username={post.username}
          caption={post.caption}
        /> : '')
      ))
    )
  )
}

export default App;
