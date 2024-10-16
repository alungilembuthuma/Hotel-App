import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignup = () => {
    dispatch(signupUser({ email, password }));
  };

  return (
    <div>
      <h1>Signup</h1>
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
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
