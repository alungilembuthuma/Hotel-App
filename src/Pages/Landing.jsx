import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';

export default function Landing() {
  const [text, setText] = useState('');
  const fullText = "Welcome to Your Dream Destination";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, index)); // Set the text to the substring of fullText
      index++;
      if (index > fullText.length) {
        clearInterval(typingInterval); // Stop typing when done
      }
    }, 150); // Typing speed

    // Clean up the interval on component unmount
    return () => clearInterval(typingInterval);
  }, [fullText]); // Dependency array to prevent unnecessary re-renders

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      backgroundImage: "url('https://th.bing.com/th/id/R.732d1ac4f6d42bdbf91d5369c3a096fe?rik=tnJ1yA2GYgTV4A&pid=ImgRaw&r=0.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#FFFFFF", // Text color for contrast
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "40px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
          borderRadius: "8px",
          fontStyle: "italic",
          minHeight: "60px", // Keeps space for the text
        }}>
          {text}
        </h1>
      </div>
      <Footer />
    </div>
  );
}
