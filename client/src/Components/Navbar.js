import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css"; // keep using your existing CSS

function Navbar() {
  return (
    <nav class="navbar">
  <div class="navbar-left">
    <h1 class="navbar-title">HireMe</h1>
  </div>
  <ul class="navbar-right">
    <li><Link to="/">Home</Link></li>
        <li><Link to="/ats">ATS Checker</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
  </ul>
</nav>

  );
}

export default Navbar;
