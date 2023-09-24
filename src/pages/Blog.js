import React from 'react'
import Data from './Blog/data.js';
import { Link } from 'react-router-dom';
import ArticleList from './Blog/ArticleList.jsx';

import './Blog.css';
const Blog = () => {
  return (
    <div className='blogcontainer row '>

    <div className=''>
      {Data.map((Data, key) => (
        <nav className="navbar p-3 navbarcontainer">
          <h1>
            <Link className="nav-link" key={key} to="/blog">
              {Data.title}
            </Link>
          </h1>
          <a
            className="nav-link btn btn-dark text-white"
            href="https://github.com/PureshwarGonekar"
          >
            Github
          </a>{" "}
          <a
            className="nav-link btn btn-dark text-white"
            href="#"
          >
            👉 Hire Me
          </a>
        </nav>
      ))}
    </div>
    <div className="articleList">

      <ArticleList/>
    </div>
    </div>
  );
}

export default Blog