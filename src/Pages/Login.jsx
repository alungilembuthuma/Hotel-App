import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.auth);

  // const handleLogin = () => {
  //   if (!email || !password) {
  //     setErrorMessage("Please fill out both fields.");
  //     return;
  //   }

  //   setErrorMessage(""); // Clear previous error message
  //   dispatch(loginUser({ email, password }));
  // };

  return (
    <div style={{backgroundColor:"Pink"}}>
     
      {/* <input
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
};

export default Login;
