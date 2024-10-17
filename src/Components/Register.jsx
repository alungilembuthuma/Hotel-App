import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/authSlice'; // Assuming you have this action
import Footer from '../Components/Footer';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    dispatch(registerUser({ email, password, role })).then((response) => {
      if (response.payload) {
        if (role === 'admin') {
          navigate('/admin/dashboard'); // Redirect to admin dashboard after registering
        } else {
          navigate('/user-profile'); // Redirect to user profile after registering
        }
      }
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>

      {/* Role Selection */}
      <label style={styles.label}>Register as:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.select}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {/* Email Input */}
      <label style={styles.label}>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={styles.input}
      />

      {/* Password Input */}
      <label style={styles.label}>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={styles.input}
      />

      {/* Confirm Password Input */}
      <label style={styles.label}>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        style={styles.input}
      />

      {/* Submit Button */}
      <button 
        onClick={handleRegister} 
        disabled={loading} 
        style={styles.button}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      {/* Display error if there's a registration issue */}
      {error && <p style={styles.error}>{error}</p>}

      <div style={{width:"110%",marginTop:"5%"}}>
     <Footer /></div>
     
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '160vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
    fontSize: '40px',
    marginBottom: '20px',
  },
  label: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  select: {
    width: '30%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  input: {
    width: '30%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '30%',
    padding: '10px',
    backgroundColor: '#daa265',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
};

export default Register;
