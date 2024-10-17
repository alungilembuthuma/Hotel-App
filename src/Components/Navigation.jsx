import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/684ad1ec-6640-45ae-ae5a-326285e571a4.svg'

const Navbar = () => {
  return (
    <nav className="navbar" style={{ 
      backgroundColor: "#EDD1A7", 
      display: "flex", 
      padding: "10px 20px",
      position: "fixed",  // Fixed position
      top: 0,  // Stick it to the top
      width: "100%",  // Ensure it spans the full width of the screen
      zIndex: 1000  // Ensure it stays above other content
    }}>
      <div className="navbar-logo" >
        <img src={Logo} alt="HotelApp Logo" style={{ width: "100px", height: "auto" }} />
      </div>
      <ul className="navbar-links" style={{ display: "flex", alignItems: "center", marginLeft: "55%",  }}>
        <NavLink
          to="/accommodations"
          style={({ isActive }) => ({
            color: "#2B1716",
            marginLeft: "2rem",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "20px",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Accommodations
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            color: "#2B1716",
            marginLeft: "2rem",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "20px",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          style={({ isActive }) => ({
            color: "#2B1716",
            marginLeft: "2rem",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "20px",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Register
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
