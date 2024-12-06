// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Youngstars</h2>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/add-player">Register</Link>
        <Link to="/scoreboard">Scoreboard</Link>
          {isLoggedIn ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        
      </div>
    </nav>
  );
};

export default Navbar;
