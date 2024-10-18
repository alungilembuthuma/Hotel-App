import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccommodation } from '../AccommodationSlice'

const AddAccommodation = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleAddAccommodation = async (e) => {
    e.preventDefault();

    const files = Array.from(images); // Ensure images are stored as an array of files
    dispatch(addAccommodation({ name, location, description, images: files }));

    // Reset form after submission
    setName('');
    setLocation('');
    setDescription('');
    setImages([]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add New Accommodation</h1>
      
      <form onSubmit={handleAddAccommodation} style={styles.form}>
        {/* Accommodation Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Accommodation Name"
          required
          style={styles.input}
        />

        {/* Accommodation Location */}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Accommodation Location"
          required
          style={styles.input}
        />

        {/* Accommodation Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Accommodation Description"
          required
          style={styles.textarea}
        />

        {/* Upload Images */}
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          style={styles.fileInput}
          required
        />

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Add Accommodation
        </button>
      </form>
    </div>
  );
};

// Styles for the form and container
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f7f7f7',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: "10%"
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
    minHeight: '100px',
  },
  fileInput: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default AddAccommodation;
