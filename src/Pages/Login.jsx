import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <h1>Login</h1>
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
    </div>
  );
};

export default Login;
