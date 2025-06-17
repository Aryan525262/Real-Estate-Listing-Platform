import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", role: "buyer" });
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword, role } = credentials;

    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/Createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history("/");
    } else {
      alert("Signup failed. Try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <p>Create your account to get started</p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={credentials.name}
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <input
          type="cpassword"
          name="cpassword"
          value={credentials.cpassword}
          placeholder="Confirm Password"
          onChange={onChange}
          required
        />
        <select name="role" value={credentials.role} onChange={onChange} className="w-full border px-3 py-2 my-1">
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Sign Up</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
