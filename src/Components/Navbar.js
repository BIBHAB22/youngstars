import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Youngstars</h2>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/players">Our Players</Link>
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
