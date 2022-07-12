import './App.css';
import React,{useState, useEffect} from "react";
import Profile from "./Profile";
import Posts from "./Posts";
import Header from './Header';
import Search from "./Search";
import Chats from "./Chats";
import Settings from "./Settings";
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom"
import Comments from './Comments';
/*
import Welcome from './Welcome';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
 */
import {db, auth} from "./firebase"

function App() {
  // defining posts
  const [posts, setPosts] = useState([]);
  // set user for all routes
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  },[])

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
  }, [user])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/search">
            <Header />
            <Search />
          </Route>
          <Route path="/chats">
            <Header />
            <Chats />
          </Route>
          <Route path="/settings">
            <Header />
            <Settings />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile user={user} />
          </Route>
          <Route path='/feed/comments/:cid'>
            <Header />
            <CommentsManage user={user} posts={posts} />
          </Route>
          {/* default feed route */}
          <Route path='/'>
            <Header />
            <Posts 
              className="posts-mainPage"
              user={user}
              posts={posts} 
            />
          </Route>
          {/* will be available in updates */}
          {/*
          <Route path='/sign-up'>
            <SignUp />
          </Route>
          <Route path='/sign-in'>
            <SignIn />
          </Route>
          <Route path='/'>
            <Welcome />
          </Route>
          */}
        </Switch>
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
