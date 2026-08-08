import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("interviewAIHistory") || "[]"
    );
    setHistory(saved);
  }, []);

  const totalInterviews = history.length;

  const scores = history.map((item) =>
    Number(item.score || 0)
  );

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((a, b) => a + b, 0) /
            scores.length
        )
      : 0;

  const bestScore =
    scores.length > 0 ? Math.max(...scores) : 0;

  const lowestScore =
    scores.length > 0 ? Math.min(...scores) : 0;

  const getLevel = (score) => {
    if (score >= 80) return "Interview Ready";
    if (score >= 60) return "Good Progress";
    if (score >= 40) return "Keep Practicing";
    return "Beginner";
  };

  const getScoreClass = (score) => {
    if (score >= 80) return "score-excellent";
    if (score >= 60) return "score-good";
    if (score >= 40) return "score-average";
    return "score-low";
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const recentHistory = [...history]
    .slice(0, 7)
    .reverse();

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}

      <nav className="dashboard-navbar">

        <div className="logo">
          InterviewAI
        </div>

        <div className="dashboard-nav-right">

          <span className="welcome-text">
            Welcome back 👋
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>

      {/* MAIN */}

      <main className="dashboard-container">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>
            <span className="dashboard-label">
              YOUR DASHBOARD
            </span>

            <h1>
              Interview Preparation
            </h1>

            <p>
              Practice interviews, track your
              performance, and improve your skills.
            </p>
          </div>

          <button
            className="primary-btn dashboard-start-btn"
            onClick={() => navigate("/interview")}
          >
            + Start New Interview
          </button>

        </div>

        {/* STATISTICS */}

        <div className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="stat-icon">📝</div>

            <div>
              <span>Total Interviews</span>
              <strong>{totalInterviews}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">📊</div>

            <div>
              <span>Average Score</span>
              <strong>{averageScore}%</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🏆</div>

            <div>
              <span>Best Score</span>
              <strong>{bestScore}%</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🎯</div>

            <div>
              <span>Current Level</span>
              <strong className="level-text">
                {getLevel(averageScore)}
              </strong>
            </div>
          </div>

        </div>

        {/* EMPTY STATE */}

        {history.length === 0 ? (

          <div className="empty-dashboard">

            <div className="empty-icon">
              🚀
            </div>

            <h2>
              Start Your Interview Journey
            </h2>

            <p>
              You haven't completed any interviews
              yet. Start your first practice interview
              and track your progress here.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/interview")}
            >
              Start Your First Interview →
            </button>

          </div>

        ) : (

          <>

            {/* ANALYTICS */}

            <section className="analytics-section">

              <div className="section-header">

                <h2>
                  Performance Analytics
                </h2>

                <p>
                  Your interview performance overview.
                </p>

              </div>

              <div className="analytics-grid">

                <div className="analytics-card">

                  <span className="analytics-label">
                    OVERALL PERFORMANCE
                  </span>

                  <h3>
                    {averageScore}%
                  </h3>

                  <div className="analytics-progress">

                    <div
                      className="analytics-progress-bar"
                      style={{
                        width: `${averageScore}%`
                      }}
                    />

                  </div>

                  <p className="analytics-message">
                    {averageScore >= 80
                      ? "Excellent performance! You are interview ready."
                      : averageScore >= 60
                      ? "Good progress! Keep practicing."
                      : "Keep practicing to improve your score."}
                  </p>

                </div>

                <div className="analytics-card">

                  <span className="analytics-label">
                    SCORE RANGE
                  </span>

                  <div className="score-range">

                    <div>
                      <span>Best</span>
                      <strong className="best-score">
                        {bestScore}%
                      </strong>
                    </div>

                    <div>
                      <span>Lowest</span>
                      <strong className="lowest-score">
                        {lowestScore}%
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

              {/* SCORE TREND */}

              <div className="trend-card">

                <div className="trend-header">

                  <div>
                    <span className="analytics-label">
                      PERFORMANCE TREND
                    </span>

                    <h2>
                      Your Score Progress
                    </h2>
                  </div>

                  <span className="trend-badge">
                    📈 {recentHistory.length} Interviews
                  </span>

                </div>

                <div className="simple-chart">

                  {recentHistory.map(
                    (interview, index) => {

                      const score = Math.min(
                        100,
                        Math.max(
                          0,
                          Number(interview.score || 0)
                        )
                      );

                      return (
                        <div
                          className="chart-item"
                          key={
                            interview.id || index
                          }
                        >

                          <span className="chart-score">
                            {score}%
                          </span>

                          <div className="chart-bar-wrapper">

                            <div
                              className="chart-bar"
                              style={{
                                height: `${score}%`
                              }}
                            />

                          </div>

                          <span className="chart-number">
                            #{index + 1}
                          </span>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

              {/* INSIGHTS */}

              <div className="insights-grid">

                <div className="insight-card strength">

                  <div className="insight-icon">
                    💪
                  </div>

                  <div>
                    <span>STRENGTH</span>

                    <h3>
                      {bestScore >= 80
                        ? "Strong interview performance"
                        : "Consistent practice"}
                    </h3>

                    <p>
                      Keep building on your current
                      strengths.
                    </p>
                  </div>

                </div>

                <div className="insight-card improvement">

                  <div className="insight-icon">
                    🎯
                  </div>

                  <div>
                    <span>AREA TO IMPROVE</span>

                    <h3>
                      {averageScore >= 80
                        ? "Maintain consistency"
                        : "Improve technical depth"}
                    </h3>

                    <p>
                      Focus on this area during your
                      next interview.
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* HISTORY */}

            <section className="history-section">

              <div className="section-header">

                <h2>
                  Recent Interviews
                </h2>

                <p>
                  Your latest interview performance.
                </p>

              </div>

              <div className="history-list">

                {history
                  .slice(0, 10)
                  .map((interview, index) => (

                    <div
                      className="history-card"
                      key={
                        interview.id || index
                      }
                    >

                      <div className="history-icon">
                        💼
                      </div>

                      <div className="history-info">

                        <h3>
                          {interview.role ||
                            "Technical Interview"}
                        </h3>

                        <p>
                          {interview.difficulty ||
                            "General"}
                          {" • "}
                          {interview.date ||
                            "Recent"}
                        </p>

                      </div>

                      <div
                        className={`history-score ${getScoreClass(
                          Number(
                            interview.score || 0
                          )
                        )}`}
                      >
                        {Number(
                          interview.score || 0
                        )}
                        %
                      </div>

                    </div>

                  ))}

              </div>

            </section>

          </>

        )}

      </main>

    </div>
  );
}

export default Dashboard;
