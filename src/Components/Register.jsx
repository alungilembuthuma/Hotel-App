import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/authSlice';
import Footer from '../Components/Footer'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div style={{backgroundColor:"#fbf7ff"}}>
      <h1>Register</h1>
      <h1>Register</h1>
      <h1 style={{color:"#2b1716", fontFamily:"sans-serif", fontSize:"45px", marginLeft:"45%"}}>Register</h1>
      <form style={{marginLeft:'15%'}}>
      <label style={{ fontSize:"25px",color:"#2b1716",fontFamily:"sans-serif", marginLeft:"30%", marginTop:"5%"}}>
        FullName:
    </label>
    <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <br></br>
      <label style={{ fontSize:"25px",color:"#2b1716",fontFamily:"sans-serif", marginLeft:"30%", marginTop:"100%"}}>
       Email     :
    </label>
    <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <br></br>
      <label style={{ fontSize:"25px",color:"#2b1716",fontFamily:"sans-serif", marginLeft:"30%", marginTop:"100%"}}>
        Password:
    </label>
    <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <br></br>
      <label style={{ fontSize:"25px",color:"#2b1716",fontFamily:"sans-serif", marginLeft:"30%", marginTop:"100%"}}>
        Confirm:
    </label>
    <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      </form>
    
      
     
     
      <button onClick={handleRegister} disabled={loading} style={{marginLeft:"48%", marginTop:"5%"}}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p>{error}</p>}
      <div style={{marginTop:"5%"}}>  
        <Footer/></div>
    
    </div>
  );
};

export default Register;
