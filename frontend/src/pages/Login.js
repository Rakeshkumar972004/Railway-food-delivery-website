import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import bgImage from "../assets/bg-image.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate("/pnr");
      alert("Login successful!");
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <h2 className="login-title">Login</h2>

        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn login-btn" onClick={handleLogin}>
          
          Login
        </button>
      
      </div>
    </div>
  );
}
