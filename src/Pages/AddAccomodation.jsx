import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For navigation
import { db, storage } from '../firebase'; // Make sure Firebase is initialized
import { ref as dbRef, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for images
import Footer from '../Components/Footer'

const AddAccommodation = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // Store image files
  const [imageUrls, setImageUrls] = useState([]); // Store uploaded image URLs
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Use navigate for redirect
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleAddAccommodation = async (e) => {
    e.preventDefault();
    
    const newAccommodation = {
      name,
      location,
      description,
      images: imageUrls, // Store URLs of the uploaded images
    };

    // Save the accommodation details to Firebase Database
    const accommodationId = uuidv4(); // Generate unique ID for accommodation
    await set(dbRef(db, `accommodations/${accommodationId}`), newAccommodation);

    // Reset form after submission
    setName('');
    setLocation('');
    setDescription('');
    setImages([]);
    setImageUrls([]);

    // Navigate to the accommodation listing page after submission
    navigate('/accommodations');
  };

  // Handle image upload to Firebase Storage
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files); // Get multiple files
    const promises = files.map(async (file) => {
      const imageRef = storageRef(storage, `images/${file.name + uuidv4()}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      return url;
    });

    const urls = await Promise.all(promises); // Get all URLs after upload
    setImageUrls((prevUrls) => [...prevUrls, ...urls]); // Append URLs to the state
    setImages((prevImages) => [...prevImages, ...files]); // Append files to the state
  };

  // Function to go to the next image in the slideshow
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  // Function to go to the previous image in the slideshow
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Accommodation</h1>
      
      <form onSubmit={handleAddAccommodation} style={styles.form}>
        {/* Accommodation Name */}
        <input
          type="text"
          placeholder="Accommodation Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        ></textarea>

        {/* Image Upload */}
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          style={styles.fileInput}
          required
        />

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Add Accommodation
        </button>
      </form>

      {/* Navigation Button */}
      <button
        style={styles.accommodationPageButton}
        onClick={() => navigate('/accommodations')}
      >
        View Accommodation Listings
      </button>

      {/* Slideshow */}
      {imageUrls.length > 0 && (
        <div style={styles.slideshowContainer}>
          <button onClick={prevImage} style={styles.arrow}>❮</button>
          <img
            src={imageUrls[currentIndex]}
            alt="Accommodation"
            style={styles.image}
          />
          <button onClick={nextImage} style={styles.arrow}>❯</button>
        </div>
      )}
      <div style={{ width:"105%", marginTop:"2%"}}>
      <Footer/>
      </div>
      
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    marginTop: "9%",
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  fileInput: {
    margin: '10px 0',
  },
  button: {
    padding: '10px',
    backgroundColor: '#DAA265',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  accommodationPageButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
  slideshowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    position: 'relative',
  },
  image: {
    width: '300px',
    height: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  arrow: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

export default AddAccommodation;
