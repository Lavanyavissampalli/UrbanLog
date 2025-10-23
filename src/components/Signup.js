import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';

function Signup({ onSignup }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      setMessage("Signup successful!");

      if (onSignup) onSignup();

      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed.");
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "32px auto" }}>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
