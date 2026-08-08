import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Results from "./pages/Results";

import "./App.css";

function Home() {
  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div className="logo">
          InterviewAI
        </div>

        <div className="nav-links">

          <a href="#features">
            Features
          </a>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

        </div>

      </nav>

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">

        <div className="hero-content">

          <span className="badge">
            🤖 AI-Powered Interview Practice
          </span>

          <h1>
            Practice Interviews.
            <br />
            <span>Get Hired.</span>
          </h1>

          <p>
            Prepare for technical and HR interviews with an
            AI-powered platform that helps you practice,
            improve, and become interview-ready.
          </p>

          <div className="hero-buttons">

            <Link to="/signup">
              <button className="primary-btn">
                Start Practicing →
              </button>
            </Link>

            <Link to="/login">
              <button className="secondary-btn">
                Login
              </button>
            </Link>

          </div>

          {/* Stats */}

          <div className="stats">

            <div>
              <strong>AI</strong>
              <span>Powered Practice</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Available</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Self-Paced</span>
            </div>

          </div>

        </div>

        {/* AI Preview Card */}

        <div className="hero-card">

          <div className="card-header">

            <span>
              AI Interview Session
            </span>

            <span className="online">
              ● Live
            </span>

          </div>

          <div className="question-box">

            <small>
              INTERVIEW QUESTION
            </small>

            <h3>
              Tell me about a challenging project you
              worked on and how you solved it.
            </h3>

          </div>

          <div className="score">

            <div className="score-circle">
              82%
            </div>

            <div>

              <strong>
                Good Answer
              </strong>

              <p>
                Strong communication and relevant example.
              </p>

            </div>

          </div>

          <div className="feedback">

            <strong>
              AI Feedback
            </strong>

            <p>
              Try adding more technical details to make
              your answer stronger.
            </p>

          </div>

        </div>

      </section>

      {/* =========================
          FEATURES
      ========================= */}

      <section
        className="features"
        id="features"
      >

        <h2>
          Everything You Need to Prepare
        </h2>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="icon">
              🤖
            </div>

            <h3>
              AI-Powered Questions
            </h3>

            <p>
              Practice with intelligent interview questions
              designed for different job roles and
              difficulty levels.
            </p>

          </div>

          <div className="feature-card">

            <div className="icon">
              📊
            </div>

            <h3>
              Performance Analysis
            </h3>

            <p>
              Understand your strengths and identify areas
              where you need to improve.
            </p>

          </div>

          <div className="feature-card">

            <div className="icon">
              🎯
            </div>

            <h3>
              Role-Based Practice
            </h3>

            <p>
              Prepare specifically for Software Developer,
              Frontend, Backend, Full Stack, and other roles.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

function App() {

  /*
    =========================
    BACKEND CONNECTION TEST
    =========================

    This runs when the React application starts
    and checks whether our Express backend is working.
  */

  useEffect(() => {

    fetch("http://localhost:5000")

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Backend returned an error"
          );
        }

        return response.json();

      })

      .then((data) => {

        console.log(
          "Backend response:",
          data
        );

      })

      .catch((error) => {

        console.error(
          "Backend connection failed:",
          error
        );

      });

  }, []);

  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Application */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;