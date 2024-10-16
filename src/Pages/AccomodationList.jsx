import React from 'react';
import Footer from '../Components/Footer';

export default function AccommodationList() {
  return (
    <div style={{ backgroundColor: "#EFEFEF", width: "100%", height:"100%" }}>
      <div style={{ padding: "20px" }}>
        <img 
          src="https://www.maritimetravel.ca/wp-content/uploads/2023/11/Secrets-Akumal-Riviera-Maya-SEARM-P0010-Junior-Suite-Swim-Out-King.16x9.webp.jpg" 
          alt="Accommodation" 
          style={{ width: "30%", height: "auto", borderRadius: "10px" }} 
        />
        <h2 style={{ marginTop: "20px" }}>Secrets Akumal Riviera Maya</h2>
        <p>Junior Suite Swim-Out King</p>
      </div>

      <Footer />
    </div>
  );
}
