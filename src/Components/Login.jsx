import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice'; 
import Footer from '../Components/Footer'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div style={{ backgroundColor:"#fbf7ff", width:"100%", height:"100vh"}}>
      
      <h1>Login Page</h1>
      <h1>Login Page</h1>
      <h1 style={{color:"#2b1716", fontFamily:"sans-serif", fontSize:"45px", marginLeft:"40%"}}>Login Page</h1>
    <label style={{ fontSize:"25px",color:"#2b1716"}}>
        Email:
    </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p>{error}</p>} 
      <Footer/>
    </div>
  );
};

export default Login;
