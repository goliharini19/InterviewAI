const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/*
================================
TEST ROUTE
================================
*/

app.get("/", (req, res) => {
  res.json({
    message: "InterviewAI backend is running successfully!",
  });
});

/*
================================
QUESTION DATABASE
================================
*/

const questionBank = {
  "Software Developer": {
    Beginner: [
      "What is the difference between a compiler and an interpreter?",
      "What are variables and data types in programming?",
      "What is the difference between a loop and a conditional statement?",
      "What is object-oriented programming?",
      "What is the purpose of a function in programming?",
    ],

    Intermediate: [
      "Explain the four main principles of object-oriented programming.",
      "What is the difference between an array and a linked list?",
      "What is exception handling and why is it important?",
      "Explain the difference between stack and heap memory.",
      "How would you debug a program that is producing incorrect output?",
    ],

    Advanced: [
      "How would you design a scalable software architecture for a large application?",
      "Explain SOLID principles and how they improve software design.",
      "What techniques would you use to optimize a slow application?",
      "Explain the difference between concurrency and parallelism.",
      "How would you design a fault-tolerant distributed application?",
    ],
  },

  "Frontend Developer": {
    Beginner: [
      "What is HTML and what is it used for?",
      "What is the difference between CSS classes and IDs?",
      "What is JavaScript and why is it used in web development?",
      "What is the DOM?",
      "What is responsive web design?",
    ],

    Intermediate: [
      "What is the difference between state and props in React?",
      "Explain the React component lifecycle.",
      "What are React Hooks and why are they useful?",
      "What is event delegation in JavaScript?",
      "How would you improve the performance of a React application?",
    ],

    Advanced: [
      "How would you architect a large-scale React application?",
      "Explain code splitting and lazy loading in React.",
      "How would you optimize a React application with thousands of components?",
      "Explain the difference between client-side rendering and server-side rendering.",
      "How would you design a reusable component system for a large organization?",
    ],
  },

  "Backend Developer": {
    Beginner: [
      "What is a backend server?",
      "What is an API?",
      "What is the difference between GET and POST requests?",
      "What is a database?",
      "What is authentication?",
    ],

    Intermediate: [
      "Explain how REST APIs work.",
      "What is middleware in Express.js?",
      "What is the difference between SQL and NoSQL databases?",
      "How does JWT authentication work?",
      "How would you handle errors in a backend application?",
    ],

    Advanced: [
      "How would you design a scalable REST API?",
      "How would you secure an API against common attacks?",
      "Explain database indexing and when you would use it.",
      "How would you design a backend capable of handling millions of requests?",
      "Explain caching strategies for a high-traffic application.",
    ],
  },

  "Full Stack Developer": {
    Beginner: [
      "What is the difference between frontend and backend development?",
      "What is a REST API?",
      "What is React used for?",
      "What is Node.js?",
      "What is MongoDB?",
    ],

    Intermediate: [
      "Explain how a React frontend communicates with a Node.js backend.",
      "What is the MERN stack and what does each technology do?",
      "How would you implement authentication in a full-stack application?",
      "What is the difference between local storage, cookies, and sessions?",
      "How would you connect a React application to MongoDB through a backend?",
    ],

    Advanced: [
      "How would you design a scalable MERN stack application?",
      "How would you secure authentication in a full-stack application?",
      "How would you optimize both frontend and backend performance?",
      "How would you design a real-time full-stack application?",
      "How would you deploy and monitor a production full-stack application?",
    ],
  },

  "Data Analyst": {
    Beginner: [
      "What is the difference between data and information?",
      "What is SQL and why is it useful for data analysis?",
      "What is a primary key in a database?",
      "What is data visualization?",
      "What is the difference between mean, median, and mode?",
    ],

    Intermediate: [
      "Explain the difference between INNER JOIN and LEFT JOIN.",
      "How would you handle missing values in a dataset?",
      "What is the difference between correlation and causation?",
      "How would you identify outliers in a dataset?",
      "How would you present complex data to a non-technical audience?",
    ],

    Advanced: [
      "How would you design a data pipeline for a large dataset?",
      "How would you optimize a slow SQL query?",
      "Explain how you would detect anomalies in a large dataset.",
      "How would you measure the reliability of an analytical model?",
      "How would you communicate conflicting results to business stakeholders?",
    ],
  },
};

/*
================================
SMART ANSWER EVALUATION
================================
*/

function evaluateAnswer(answer, question) {
  const text = answer.toLowerCase().trim();

  const words = text.split(/\s+/).filter(Boolean);

  const wordCount = words.length;

  if (wordCount === 0) {
    return {
      score: 0,
      feedback: "No answer was provided.",
    };
  }

  let score = 0;

  // Answer length
  if (wordCount >= 80) {
    score += 30;
  } else if (wordCount >= 50) {
    score += 25;
  } else if (wordCount >= 30) {
    score += 20;
  } else if (wordCount >= 15) {
    score += 12;
  } else {
    score += 5;
  }

  // Technical vocabulary
  const technicalWords = [
    "api",
    "database",
    "javascript",
    "react",
    "node",
    "mongodb",
    "sql",
    "algorithm",
    "function",
    "class",
    "object",
    "component",
    "authentication",
    "authorization",
    "server",
    "client",
    "http",
    "rest",
    "json",
    "performance",
    "security",
    "testing",
    "deployment",
    "cloud",
    "optimization",
    "data",
    "query",
  ];

  const matchedWords = technicalWords.filter(
    (word) => text.includes(word)
  );

  score += Math.min(
    matchedWords.length * 4,
    30
  );

  // Explanation indicators
  const explanationWords = [
    "because",
    "therefore",
    "example",
    "for example",
    "such as",
    "however",
    "solution",
    "approach",
    "used",
    "implemented",
  ];

  const explanationMatches =
    explanationWords.filter((word) =>
      text.includes(word)
    );

  score += Math.min(
    explanationMatches.length * 4,
    20
  );

  // Avoid extremely short or meaningless answers
  const uniqueWords = new Set(words);

  if (
    uniqueWords.size < 5 ||
    text.length < 15
  ) {
    score = Math.min(score, 15);
  }

  score = Math.min(
    Math.round(score),
    100
  );

  let feedback = "";

  if (score >= 80) {
    feedback =
      "Strong answer. You provided good detail and used relevant concepts.";
  } else if (score >= 60) {
    feedback =
      "Good answer, but adding more technical explanation or examples would make it stronger.";
  } else if (score >= 40) {
    feedback =
      "Your answer has some useful information, but it needs more explanation and technical detail.";
  } else {
    feedback =
      "Your answer is too short or lacks relevant details. Try explaining the concept with an example.";
  }

  return {
    score,
    feedback,
  };
}

/*
================================
GENERATE INTERVIEW
================================
*/

app.post("/api/interview", (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        success: false,
        message:
          "Role and difficulty are required.",
      });
    }

    const roleQuestions =
      questionBank[role];

    if (!roleQuestions) {
      return res.status(400).json({
        success: false,
        message:
          "Questions are not available for this role.",
      });
    }

    const questions =
      roleQuestions[difficulty];

    if (!questions) {
      return res.status(400).json({
        success: false,
        message:
          "Questions are not available for this difficulty.",
      });
    }

    res.json({
      success: true,
      role,
      difficulty,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to generate interview questions.",
    });
  }
});

/*
================================
EVALUATE COMPLETE INTERVIEW
================================
*/

app.post("/api/evaluate", (req, res) => {
  try {
    const {
      questions,
      answers,
    } = req.body;

    if (
      !questions ||
      !answers ||
      questions.length !== answers.length
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Questions and answers are required.",
      });
    }

    const evaluations = questions.map(
      (question, index) => {
        return evaluateAnswer(
          answers[index],
          question
        );
      }
    );

    const totalScore = Math.round(
      evaluations.reduce(
        (total, item) =>
          total + item.score,
        0
      ) / evaluations.length
    );

    res.json({
      success: true,
      overallScore: totalScore,
      evaluations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to evaluate interview.",
    });
  }
});

/*
================================
START SERVER
================================
*/

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});