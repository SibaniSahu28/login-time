import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, updateLoginTime } from "./firebaseService";
import './General.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginUser(email);
      if (user && user.password === password) {
        await updateLoginTime(email);
        localStorage.setItem("email", email);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Error logging in. Try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
