import './App.css';
import React from "react";
import Profile from "./Profile";
import Posts from "./Posts";
import Header from './Header';
import Search from "./Search";
import Chats from "./Chats";
import Settings from "./Settings";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"

function App() {
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
            <Profile />
          </Route>
          <Route path='/'>
            <Header />
            <Posts className="posts-mainPage" />
            <Link to="/profile">
                <h1>Click</h1>
            </Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
