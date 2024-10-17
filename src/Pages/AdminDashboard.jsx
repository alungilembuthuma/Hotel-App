import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from React Router
import { db } from "../firebase"; // Assuming you have firebase initialized
import { ref, onValue } from "firebase/database"; // Use Firebase Realtime Database
import { IoMdMenu } from "react-icons/io";
import { TfiFaceSad } from "react-icons/tfi";
import Footer from '../Components/Footer';

const AdminDashboard = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default state is closed
  const { user } = useSelector((state) => state.auth); // Get user info from Redux

  useEffect(() => {
    if (user) {
      setAdminName(user.email); // Assuming email is the identifier
      const accommodationsRef = ref(db, `accommodations/${user.uid}`);
      onValue(accommodationsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAccommodations(Object.values(data)); // Store accommodations in state
        }
      });
    }
  }, [user]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); 
  };

  return (
    <div style={{ marginTop: "8%" }}>
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}

      <div
        style={{
          marginLeft: isSidebarOpen ? "250px" : "10px", 
          transition: "margin-left 0.3s ease", 
          padding: "20px",
          flexGrow: 1,
          position: "relative", 
          backgroundColor: "#f9f9f9",
        }}
      >
        <button onClick={toggleSidebar} style={{ margin: "10px", border: "none", background: "none" }}>
          <IoMdMenu size={24} /> {/* Icon size adjusted */}
        </button>
        <div style={{ marginLeft: "10%" }}>
          <h1 style={{ fontSize: "70px", marginLeft: "25%" }}>Welcome, {adminName}</h1>
          <div>
            {/* Optionally: Profile picture code */}
          </div>
          <h2 style={{ marginLeft: "35%", marginTop: "5%" }}>Your Accommodations</h2>
          <ul>
            {accommodations.length > 0 ? (
              accommodations.map((acc, index) => (
                <li key={index}>{acc.name}</li> // Assuming `name` is a field in accommodations
              ))
            ) : (
              <div style={{ marginLeft: "41%" }}>
                <TfiFaceSad />
              </div>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        background: "#f4f4f4",
        padding: "20px",
        position: "absolute", // Changed to absolute
        height: "120vh",
        zIndex: 1000, // Ensure sidebar is above other elements
      }}
    >
      <h2>Admin Menu</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <Link to="/admin/profile" style={styles.link}>Admin Profile</Link>
        </li>
        <li>
          <Link to="/admin/accommodations/new" style={styles.link}>Add Accommodation</Link>
        </li>
        <li>
          <Link to="/admin/bookings" style={styles.link}>See Bookings</Link>
        </li>
        <li>
          <Link to="/admin/reviews" style={styles.link}>See Reviews</Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    padding: '10px 0',
    display: 'block',
    transition: 'color 0.3s ease',
  },
};

export default AdminDashboard;
