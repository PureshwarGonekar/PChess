// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = ({ selectedMenuItem, handleMenuItemClick }) => {
  return (
    <div className="side-bar border2 ">
      <div>
        <img className="mainlogo" src={require("../img/pchess.png")} alt='icon' />
        <hr className="line"  />
      </div>
      <ul className="menu">
        <li>
          <Link
            to="/"
            onClick={() => handleMenuItemClick("Home")} // Set the selected menu item to 'Home' when clicked
            className={selectedMenuItem === "Home" ? "active" : ""} // Apply 'active' class for the selected menu item
          >
            <img className="menulogo" src={require("../img/home.png")} alt='icon' />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/play"
            onClick={() => handleMenuItemClick("Play")}
            className={selectedMenuItem === "Play" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/pawn.png")} alt='icon' />
            Play
          </Link>
        </li>
        <li>
          <Link
            to="/join"
            onClick={() => handleMenuItemClick("Join")}
            className={selectedMenuItem === "Join" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/creategame.png")} alt='icon' />
            Join Match
          </Link>
        </li>
        <li>
          <Link
            to="/theme"
            onClick={() => handleMenuItemClick("Theme")}
            className={selectedMenuItem === "Theme" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/theme.png")} alt='icon' />
            Theme
          </Link>
        </li>
        <li>
          <Link
            to="/players"
            onClick={() => handleMenuItemClick("Players")}
            className={selectedMenuItem === "Players" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/players.png")} alt='icon' />
            Players
          </Link>
        </li>
        <li>
          <Link
            to="/blog"
            onClick={() => handleMenuItemClick("Blog")}
            className={selectedMenuItem === "Blog" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/blog.png")} alt='icon' />
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            onClick={() => handleMenuItemClick("Signup")}
            className={selectedMenuItem === "Signup" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/signup.png")} alt='icon' />
            Signup
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            onClick={() => handleMenuItemClick("Login")}
            className={selectedMenuItem === "Login" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/login.png")} alt='icon' />
            Login
          </Link>
        </li>
      </ul>
      <footer className='footer'>
        <hr className="line"  />
        <p>Developed by <br /> <strong>Pureshwar Gonekar </strong> </p>
        <a href='https://github.com/PureshwarGonekar' target='_blank' >
            <img className="menulogo" src={require("../img/github.png")} alt='github' />
          </a>
          <a href='https://www.linkedin.com/in/pureshwar-gonekar-358b661aa/' target='_blank' >
            <img className="menulogo" src={require("../img/linkedin.png")} alt='linkedin' />
          </a>
      </footer>
    </div>
  );
};

export default Sidebar;
