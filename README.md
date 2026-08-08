# InterviewAI — AI-Powered Interview Preparation Platform

InterviewAI is a web-based interview preparation platform designed to help students and job seekers practice interviews, answer role-specific questions, track their performance, and identify areas for improvement.

The platform provides a simple interview experience with resume-based preparation, automated scoring, feedback, and interview history tracking.

## 🚀 Features

* 🔐 **User Authentication**

  * Login and signup interface
  * User session handling

* 🎯 **Interview Practice**

  * Start a new mock interview
  * Select interview role and difficulty
  * Practice technical and general interview questions

* 📄 **Resume-Based Interview**

  * Paste your resume
  * Generate interview questions based on the provided resume
  * Practice questions relevant to your skills and experience

* 📝 **Answer Evaluation**

  * Submit answers for each question
  * Evaluate answer quality
  * Generate performance scores and feedback

* 📊 **Performance Dashboard**

  * Total interviews completed
  * Average score
  * Best score
  * Current performance level

* 📚 **Interview History**

  * View previous interview attempts
  * Track scores and performance over time

* 🏆 **Results & Feedback**

  * Overall interview score
  * Question-wise performance
  * Feedback and improvement suggestions

* 💾 **Local Data Storage**

  * Interview history and results are stored locally for quick access

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST API

### Development Tools

* VS Code
* Git
* GitHub

## 📁 Project Structure

```text
ai-interview-platform/
│
├── public/
│
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Interview.jsx
│   │   ├── Login.jsx
│   │   ├── Results.jsx
│   │   └── Signup.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/InterviewAI.git
```

### 2. Open the project

```bash
cd InterviewAI
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Start the frontend

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

### 5. Start the backend

Open a second terminal:

```bash
cd server
npm install
npm start
```

The backend will start separately.

## 🎮 How It Works

```text
User
  ↓
Login / Signup
  ↓
Dashboard
  ↓
Choose Interview Type
  ↓
General Interview / Resume-Based Interview
  ↓
Answer Questions
  ↓
Answer Evaluation
  ↓
Score & Feedback
  ↓
Results
  ↓
Interview History
```

## 📊 Performance Tracking

InterviewAI calculates useful performance metrics such as:

* Total interviews
* Average score
* Best score
* Current performance level
* Individual question scores
* Feedback and improvement suggestions

This allows users to understand their strengths and focus on areas that need more practice.

## 🎯 Future Improvements

The project can be extended with:

* 🎤 Voice-based interviews
* 📹 Video interview simulation
* 🤖 More advanced AI evaluation
* 📈 Performance analytics and charts
* ☁️ Cloud-based user accounts
* 🗄️ Database integration
* 📧 Personalized interview reports
* 🔔 Interview reminders
* 🧑‍💼 More role-specific question banks

## 👩‍💻 Author

**Harini Reddy**
