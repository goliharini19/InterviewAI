import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Results() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem(
      "latestInterviewResult"
    );

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  if (!result) {
    return (
      <div className="results-page">

        <nav className="results-navbar">
          <div className="logo">
            InterviewAI
          </div>

          <button
            className="logout-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </nav>

        <div className="results-content">

          <div className="results-header">

            <div className="results-icon">
              📊
            </div>

            <h1>
              No Results Found
            </h1>

            <p>
              Complete an interview to see your
              performance results.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/interview")}
            >
              Start Interview
            </button>

          </div>

        </div>

      </div>
    );
  }

  const score = Number(result.score || 0);

  const getPerformance = () => {
    if (score >= 80) {
      return {
        title: "Excellent Performance! 🎉",
        message:
          "You demonstrated strong interview skills and are well prepared.",
      };
    }

    if (score >= 60) {
      return {
        title: "Good Performance! 👍",
        message:
          "You are making good progress. Keep practicing to become more confident.",
      };
    }

    if (score >= 40) {
      return {
        title: "Good Start! 💪",
        message:
          "You have a foundation to build on. Practice regularly to improve.",
      };
    }

    return {
      title: "Keep Practicing! 🚀",
      message:
        "Don't worry. Every interview is an opportunity to improve your skills.",
    };
  };

  const performance = getPerformance();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleRetry = () => {
    navigate("/interview");
  };

  return (
    <div className="results-page">

      {/* NAVBAR */}

      <nav className="results-navbar">

        <div className="logo">
          InterviewAI
        </div>

        <button
          className="logout-btn"
          onClick={handleDashboard}
        >
          Dashboard
        </button>

      </nav>

      {/* CONTENT */}

      <main className="results-content">

        {/* HEADER */}

        <div className="results-header">

          <div className="results-icon">
            🎉
          </div>

          <h1>
            Interview Completed
          </h1>

          <p>
            Here's how you performed in your
            interview.
          </p>

        </div>

        {/* SCORE */}

        <div className="score-card">

          <div className="large-score">
            {score}%
          </div>

          <div>

            <h2>
              {performance.title}
            </h2>

            <p>
              {performance.message}
            </p>

          </div>

        </div>

        {/* STATISTICS */}

        <div className="results-stats">

          <div>

            <strong>
              {score}%
            </strong>

            <span>
              Overall Score
            </span>

          </div>

          <div>

            <strong>
              {result.totalQuestions ||
                result.questions ||
                0}
            </strong>

            <span>
              Questions
            </span>

          </div>

          <div>

            <strong>
              {result.correctAnswers ||
                result.correct ||
                "-"}
            </strong>

            <span>
              Strong Answers
            </span>

          </div>

          <div>

            <strong>
              {result.role ||
                "Interview"}
            </strong>

            <span>
              Interview Type
            </span>

          </div>

        </div>

        {/* FEEDBACK */}

        <section className="feedback-section">

          <h2>
            Interview Feedback
          </h2>

          <div className="feedback-card positive">

            <span>
              ✓
            </span>

            <div>

              <h3>
                What You Did Well
              </h3>

              <p>
                You completed the interview and
                demonstrated your understanding
                through your responses.
              </p>

            </div>

          </div>

          <div className="feedback-card improvement">

            <span>
              !
            </span>

            <div>

              <h3>
                Areas to Improve
              </h3>

              <p>
                Continue practicing clear,
                structured answers and try to
                provide specific examples.
              </p>

            </div>

          </div>

        </section>

        {/* ACTIONS */}

        <div className="results-actions">

          <button
            className="secondary-btn"
            onClick={handleDashboard}
          >
            ← Back to Dashboard
          </button>

          <button
            className="primary-btn"
            onClick={handleRetry}
          >
            Practice Again →
          </button>

        </div>

      </main>

    </div>
  );
}

export default Results;
