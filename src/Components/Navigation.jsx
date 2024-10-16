import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HotelApp</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/accommodations">Accommodations</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/user-profile">Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
