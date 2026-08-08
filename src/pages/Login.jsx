import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("interviewAIUser");

    if (!savedUser) {
      alert("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email === email && user.password === password) {
      localStorage.setItem("interviewAILoggedIn", "true");

      alert(`Welcome back, ${user.name}! 👋`);

      navigate("/dashboard");
    } else {
      alert("Incorrect email or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>

        <p>
          Login to continue your interview preparation.
        </p>

        <form onSubmit={handleLogin}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn auth-btn">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;