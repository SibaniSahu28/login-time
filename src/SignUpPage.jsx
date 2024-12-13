import React, { useState } from "react";
import { signUpUser } from "./firebaseService";
import './General.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Store user data in Firebase
      await signUpUser(email, password);
      alert("Signup successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError(""); // Clear error after success
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button onClick={handleSignup}>Signup</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignupPage;
