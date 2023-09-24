// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = ({ selectedMenuItem, handleMenuItemClick }) => {
  return (
    <div className="side-bar border2 ">
      <div>
        <img className="mainlogo" src={require("../img/pchess.png")} />
        <hr className="line" />
      </div>
      <ul className="menu">
        <li>
          <Link
            to="/"
            onClick={() => handleMenuItemClick("Home")} // Set the selected menu item to 'Home' when clicked
            className={selectedMenuItem === "Home" ? "active" : ""} // Apply 'active' class for the selected menu item
          >
            <img className="menulogo" src={require("../img/home.png")} />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/play"
            onClick={() => handleMenuItemClick("Play")}
            className={selectedMenuItem === "Play" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/pawn.png")} />
            Play
          </Link>
        </li>
        <li>
          <Link
            to="/theme"
            onClick={() => handleMenuItemClick("Theme")}
            className={selectedMenuItem === "Theme" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/theme.png")} />
            Theme
          </Link>
        </li>
        <li>
          <Link
            to="/blog"
            onClick={() => handleMenuItemClick("Blog")}
            className={selectedMenuItem === "Blog" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/blog.png")} />
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            onClick={() => handleMenuItemClick("Signup")}
            className={selectedMenuItem === "Signup" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/signup.png")} />
            Signup
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            onClick={() => handleMenuItemClick("Login")}
            className={selectedMenuItem === "Login" ? "active" : ""}
          >
            <img className="menulogo" src={require("../img/login.png")} />
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
