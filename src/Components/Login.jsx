import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice'; 
import Footer from '../Components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login Page</h1>

      <label style={styles.label}>
        Email:
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={styles.input}
      />

      <label style={styles.label}>
        Password:
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={styles.input}
      />

      <button 
        onClick={handleLogin} 
        disabled={loading} 
        style={styles.button}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fbf7ff',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#2b1716',
    fontFamily: 'sans-serif',
    fontSize: '45px',
    marginBottom: '20px',
  },
  label: {
    fontSize: '25px',
    color: '#2b1716',
    fontFamily: 'sans-serif',
    marginBottom: '10px',
  },
  input: {
    width: '35%',
    height: '30px',
    marginBottom: '20px',
    padding: '10px',
    fontSize: '18px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '15%',
    height: '40px',
    backgroundColor: '#daa265',
    color: '#fff',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
  footerContainer: {
    marginTop: '50px',
    width: '100%',
  },
};

export default Login;
