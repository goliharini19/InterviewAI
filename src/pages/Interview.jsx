import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const defaultQuestions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why should we hire you?",
  "Describe a challenging project you worked on.",
  "Where do you see yourself in five years?"
];

function generateResumeQuestions(resume) {
  const text = resume.toLowerCase();
  const questions = [];

  if (text.includes("react")) {
    questions.push(
      "You mentioned React in your resume. Explain how you have used React in your projects."
    );
  }

  if (text.includes("javascript")) {
    questions.push(
      "You mentioned JavaScript in your resume. What JavaScript concepts are you most comfortable with?"
    );
  }

  if (text.includes("mongodb")) {
    questions.push(
      "You mentioned MongoDB in your resume. Explain how you used MongoDB in a project."
    );
  }

  if (text.includes("node")) {
    questions.push(
      "You mentioned Node.js in your resume. What role did Node.js play in your project?"
    );
  }

  if (text.includes("python")) {
    questions.push(
      "You mentioned Python in your resume. Which Python projects have you worked on?"
    );
  }

  if (text.includes("java")) {
    questions.push(
      "You mentioned Java in your resume. Explain an important Java concept you have used."
    );
  }

  if (text.includes("html")) {
    questions.push(
      "You mentioned HTML in your resume. Explain how you have used HTML in your projects."
    );
  }

  if (text.includes("css")) {
    questions.push(
      "You mentioned CSS in your resume. How did you use CSS to design your projects?"
    );
  }

  if (text.includes("project")) {
    questions.push(
      "Tell me about your most important project mentioned in your resume."
    );
  }

  if (text.includes("internship")) {
    questions.push(
      "Tell me about your internship experience and what you learned from it."
    );
  }

  questions.push(
    "Which skill mentioned in your resume would you like to improve further?"
  );

  questions.push(
    "Which project on your resume are you most proud of and why?"
  );

  if (questions.length < 5) {
    questions.push(...defaultQuestions);
  }

  return questions.slice(0, 5);
}

function generateFeedback(answer, question) {
  const text = answer.trim().toLowerCase();

  const words = text
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return {
      score: 0,
      title: "No Answer",
      feedback:
        "You did not provide an answer.",
      suggestion:
        "Try to answer the question clearly."
    };
  }

  let score = 30;

  if (words.length >= 10) {
    score += 15;
  }

  if (words.length >= 25) {
    score += 10;
  }

  if (words.length >= 50) {
    score += 5;
  }

  const keywords = [
    "project",
    "experience",
    "team",
    "problem",
    "solution",
    "learn",
    "skill",
    "result",
    "technology",
    "develop",
    "implemented",
    "improved"
  ];

  const keywordCount =
    keywords.filter((keyword) =>
      text.includes(keyword)
    ).length;

  score += Math.min(
    keywordCount * 4,
    20
  );

  const structureWords = [
    "first",
    "then",
    "finally",
    "because",
    "therefore",
    "however",
    "example",
    "for example"
  ];

  const structureCount =
    structureWords.filter((word) =>
      text.includes(word)
    ).length;

  score += Math.min(
    structureCount * 3,
    10
  );

  const questionWords =
    question
      .toLowerCase()
      .split(/\s+/)
      .filter(
        (word) => word.length > 4
      );

  const relevantWords =
    questionWords.filter((word) =>
      text.includes(word)
    ).length;

  if (relevantWords >= 2) {
    score += 10;
  }

  score = Math.min(score, 100);

  if (score >= 85) {
    return {
      score,
      title: "Excellent Answer",
      feedback:
        "Your answer is detailed, relevant, and well structured. It demonstrates good communication and interview readiness.",
      suggestion:
        "Keep using specific examples and measurable results when possible."
    };
  }

  if (score >= 70) {
    return {
      score,
      title: "Good Answer",
      feedback:
        "Your answer is relevant and provides useful information. You have demonstrated a reasonable understanding of the question.",
      suggestion:
        "Add a specific example or result to make your answer stronger."
    };
  }

  if (score >= 50) {
    return {
      score,
      title: "Needs Improvement",
      feedback:
        "Your answer addresses the question but needs more detail and stronger supporting information.",
      suggestion:
        "Explain the situation, your actions, and the result more clearly."
    };
  }

  return {
    score,
    title: "Weak Answer",
    feedback:
      "Your answer is too short or does not clearly address the question.",
    suggestion:
      "Give a structured response with relevant details and an example."
  };
}

function Interview() {
  const navigate = useNavigate();

  const [started, setStarted] =
    useState(false);

  const [resumeMode, setResumeMode] =
    useState(false);

  const [resume, setResume] =
    useState("");

  const [questions, setQuestions] =
    useState(defaultQuestions);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  const [feedback, setFeedback] =
    useState(null);

  const [role, setRole] =
    useState("Software Developer");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const startInterview = () => {
    if (
      resumeMode &&
      !resume.trim()
    ) {
      alert(
        "Please paste your resume before starting the interview."
      );
      return;
    }

    let interviewQuestions =
      defaultQuestions;

    if (resumeMode) {
      interviewQuestions =
        generateResumeQuestions(
          resume
        );
    }

    setQuestions(
      interviewQuestions
    );

    setStarted(true);
    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setFeedback(null);
  };

  const submitAnswer = () => {
    if (!answer.trim()) {
      alert(
        "Please enter an answer before submitting."
      );
      return;
    }

    const result =
      generateFeedback(
        answer,
        questions[currentQuestion]
      );

    const newAnswer = {
      question:
        questions[currentQuestion],

      answer: answer,

      score: result.score,

      feedback:
        result.feedback,

      suggestion:
        result.suggestion
    };

    setAnswers([
      ...answers,
      newAnswer
    ]);

    setFeedback(result);
  };

  const nextQuestion = () => {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );

      setAnswer("");
      setFeedback(null);
    } else {
      finishInterview([
        ...answers
      ]);
    }
  };

  const finishInterview = (
    finalAnswers
  ) => {
    const score =
      finalAnswers.length > 0
        ? Math.round(
            finalAnswers.reduce(
              (total, item) =>
                total +
                Number(
                  item.score || 0
                ),
              0
            ) /
              finalAnswers.length
          )
        : 0;

    const result = {
      id: Date.now(),

      role: role,

      difficulty:
        difficulty,

      interviewType:
        resumeMode
          ? "Resume Based"
          : "General",

      score: score,

      totalQuestions:
        questions.length,

      correctAnswers:
        finalAnswers.filter(
          (item) =>
            Number(item.score) >= 70
        ).length,

      answers:
        finalAnswers,

      date:
        new Date().toLocaleDateString()
    };

    localStorage.setItem(
      "latestInterviewResult",
      JSON.stringify(result)
    );

    const oldHistory =
      JSON.parse(
        localStorage.getItem(
          "interviewAIHistory"
        ) || "[]"
      );

    localStorage.setItem(
      "interviewAIHistory",
      JSON.stringify([
        result,
        ...oldHistory
      ])
    );

    navigate("/results");
  };

  return (
    <div className="interview-page">

      {/* NAVBAR */}

      <nav className="interview-navbar">

        <div className="logo">
          InterviewAI
        </div>

        <button
          className="logout-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>

      </nav>

      {!started ? (

        /* =========================
           SETUP
        ========================= */

        <div className="interview-setup">

          <div className="setup-card">

            <div className="setup-icon">
              🎤
            </div>

            <h1>
              Start Your AI Interview
            </h1>

            <p>
              Practice interviews and
              receive instant feedback.
            </p>

            <div className="setup-form">

              <label>
                Interview Type
              </label>

              <select
                value={
                  resumeMode
                    ? "Resume Based"
                    : "General Interview"
                }
                onChange={(e) =>
                  setResumeMode(
                    e.target.value ===
                      "Resume Based"
                  )
                }
              >

                <option>
                  General Interview
                </option>

                <option>
                  Resume Based
                </option>

              </select>

              <label>
                Interview Role
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value
                  )
                }
              >

                <option>
                  Software Developer
                </option>

                <option>
                  Frontend Developer
                </option>

                <option>
                  Backend Developer
                </option>

                <option>
                  Full Stack Developer
                </option>

                <option>
                  Data Analyst
                </option>

              </select>

              <label>
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(
                    e.target.value
                  )
                }
              >

                <option>
                  Easy
                </option>

                <option>
                  Medium
                </option>

                <option>
                  Hard
                </option>

              </select>

              {resumeMode && (
                <>
                  <label>
                    Paste Your Resume
                  </label>

                  <textarea
                    className="resume-input"
                    value={resume}
                    onChange={(e) =>
                      setResume(
                        e.target.value
                      )
                    }
                    placeholder="Paste your resume text here..."
                    rows="8"
                  />

                  <p className="resume-help">
                    Paste your resume to
                    generate questions based
                    on your skills and projects.
                  </p>
                </>
              )}

              <button
                className="primary-btn start-interview-btn"
                onClick={
                  startInterview
                }
              >
                Start Interview →
              </button>

            </div>

          </div>

        </div>

      ) : (

        /* =========================
           INTERVIEW
        ========================= */

        <main className="interview-content">

          <button
            className="back-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <div className="progress-container">

            <div
              className="progress-bar"
              style={{
                width: `${
                  ((currentQuestion +
                    1) /
                    questions.length) *
                  100
                }%`
              }}
            />

          </div>

          <div className="question-card">

            <div className="question-meta">

              <span>
                Question{" "}
                {currentQuestion +
                  1}{" "}
                /{" "}
                {questions.length}
              </span>

              <span>
                {resumeMode
                  ? "Resume Based"
                  : role}
              </span>

            </div>

            <h2>
              {
                questions[
                  currentQuestion
                ]
              }
            </h2>

            {!feedback ? (

              <>
                <textarea
                  value={answer}
                  onChange={(e) =>
                    setAnswer(
                      e.target.value
                    )
                  }
                  placeholder="Type your answer here..."
                  rows="8"
                />

                <div className="question-actions">

                  <span>
                    {answer.trim()
                      ? answer
                          .trim()
                          .split(
                            /\s+/
                          ).length
                      : 0}{" "}
                    words
                  </span>

                  <button
                    className="primary-btn"
                    onClick={
                      submitAnswer
                    }
                  >
                    Submit Answer →
                  </button>

                </div>
              </>

            ) : (

              /* FEEDBACK */

              <div className="answer-feedback">

                <div className="feedback-score">
                  {
                    feedback.score
                  }%
                </div>

                <h3>
                  {
                    feedback.title
                  }
                </h3>

                <p>
                  {
                    feedback.feedback
                  }
                </p>

                <div className="feedback-suggestion">

                  <strong>
                    💡 Suggestion
                  </strong>

                  <p>
                    {
                      feedback.suggestion
                    }
                  </p>

                </div>

                <button
                  className="primary-btn"
                  onClick={
                    nextQuestion
                  }
                >
                  {currentQuestion <
                  questions.length -
                    1
                    ? "Next Question →"
                    : "Finish Interview →"}
                </button>

              </div>

            )}

          </div>

        </main>

      )}

    </div>
  );
}

export default Interview;
