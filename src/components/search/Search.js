import "./Search.css"
import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

function Search() {
  return (
    <div className="search">
        <div className="search-box">
          <input
            type="search"
            className="search-bar"
          />
          <SearchIcon className="search-icon"/>
        </div>
        <div className="search-contents">
          <h1>Search results</h1>
        </div>
    </div>
  )
}

export default Search