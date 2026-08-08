import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const existingUser = localStorage.getItem("interviewAIUser");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (user.email === email) {
        alert("An account with this email already exists.");
        return;
      }
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("interviewAIUser", JSON.stringify(user));

    alert("Account created successfully! 🎉");

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account 🚀</h1>

        <p>
          Start your AI-powered interview preparation.
        </p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;