import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import "./login.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert("Login successful!");
      navigate("/quiz");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="login-form-container">
        <h1 className="login-heading">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <Link to="/signup" className="login-link">
          Don't have an account? Sign Up
        </Link>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
