import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase"; // Assuming you have firebase initialized
import { ref, onValue } from "firebase/database"; // Use Firebase Realtime Database

const AdminDashboard = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const [adminName, setAdminName] = useState("");
  const { user } = useSelector((state) => state.auth); // Get user info from Redux

  useEffect(() => {
    // Fetch admin name and accommodations
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
        // Optionally: Upload to Firebase Storage and save URL in DB
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: 1 }}>
        <h1>Admin Dashboard</h1>
        <h1>Welcome, {adminName}</h1>
        <div>
          <h2>Profile Picture</h2>
          <input type="file" onChange={handleProfilePicChange} />
          {profilePic && (
            <img
              src={profilePic}
              alt="Profile Preview"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          )}
        </div>
        <h2>Your Accommodations</h2>
        <ul>
          {accommodations.length > 0 ? (
            accommodations.map((acc, index) => (
              <li key={index}>{acc.name}</li> // Assuming `name` is a field in accommodations
            ))
          ) : (
            <p>No accommodations found.</p>
          )}
        </ul>
      </div>
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
        position: "fixed",
        height: "100vh",
      }}
    >
      <h2>Admin Menu</h2>
      <ul>
        <li>Add Accommodation</li>
        <li>See Bookings</li>
        <li>See Reviews</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
