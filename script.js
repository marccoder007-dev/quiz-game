// DOM Elements
const startBtnEl = document.getElementById("start-btn");
const restartBtnEl = document.getElementById("restart-btn");
const questionSpanEl = document.querySelector(".current-question-span");
const totalQuestionSpanEl = document.querySelector(".total-question");
const scoreSpanEl = document.querySelector(".score");
const answersContainerEl = document.querySelector(".answers-container");
const progressBarEl = document.querySelector(".progress-bar");
const startScreenEl = document.getElementById("start-screen");
const quizScreenEl = document.getElementById("quiz-screen");
const resultScreenEl = document.getElementById("result-screen");
const finalScoreEl = document.querySelector(".final-score");
const resultMessageEl = document.querySelector(".result-message");
const quizQuestionEl = document.querySelector(".quiz-question");
const currentQuestionSpan = document.querySelector(".current-question-span");

// State Variables
const quizQuestions = [
  {
    question:
      "Which of the following is a fundamental principle of Object-Oriented Programming (OOP)?",
    answers: [
      { text: "Encapsulation", correct: true },
      { text: "Compilation", correct: false },
      { text: "Recursion", correct: false },
      { text: "Concurrency", correct: false },
    ],
  },
  {
    question: "What is the primary purpose of a CSS Media Query?",
    answers: [
      { text: "To query a database for styles", correct: false },
      {
        text: "To apply styles based on device characteristics like screen width",
        correct: true,
      },
      {
        text: "To execute JavaScript functions asynchronously",
        correct: false,
      },
      { text: "To optimize image loading times", correct: false },
    ],
  },
  {
    question:
      "Which HTTP method is typically used to update an existing resource or create it if it doesn't exist?",
    answers: [
      { text: "GET", correct: false },
      { text: "DELETE", correct: false },
      { text: "PUT", correct: true },
      { text: "HEAD", correct: false },
    ],
  },
  {
    question:
      "In JavaScript, what is the main characteristic of a const variable declaration?",
    answers: [
      { text: "It can be redeclared anywhere in the script", correct: false },
      {
        text: "It creates a block-scoped variable that cannot be reassigned",
        correct: true,
      },
      {
        text: "It automatically hoists the variable to the global scope",
        correct: false,
      },
      {
        text: "It makes objects and arrays completely immutable",
        correct: false,
      },
    ],
  },
  {
    question: "What does the 'DOM' stand for in web development?",
    answers: [
      { text: "Data Object Management", correct: false },
      { text: "Digital Optimal Model", correct: false },
      { text: "Document Object Model", correct: true },
      { text: "Dynamic Output Module", correct: false },
    ],
  },
];
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let totalQuestion = quizQuestions.length;
totalQuestionSpanEl.textContent = totalQuestion;

startBtnEl.addEventListener("click", startQuiz);
restartBtnEl.addEventListener("click", restartQuiz);

function startQuiz() {
  answersDisabled = false;
  currentQuestionIndex = 0;
  score = 0;
  scoreSpanEl.textContent = 0;
  answersContainerEl.innerHTML = "";
  progressBarEl.style.width = "1%";

  quizScreenEl.classList.add("active");
  startScreenEl.classList.remove("active");
  showQuestion();
}

function showQuestion() {
  answersContainerEl.innerHTML = "";
  answersDisabled = false;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  if (currentQuestionIndex >= quizQuestions.length) {
    showResult();
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  quizQuestionEl.textContent = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const answerBtn = document.createElement("button");
    answerBtn.classList.add("answer-btn");
    answerBtn.dataset.correct = answer.correct;
    answerBtn.textContent = answer.text;
    answerBtn.addEventListener("click", selectAnswer);

    answersContainerEl.appendChild(answerBtn);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  const selectedAnswer = event.target;
  if (selectedAnswer.dataset.correct === "true") {
    score++;
    selectedAnswer.classList.add("correct");
  } else {
    Array.from(answersContainerEl.children).forEach((answer) => {
      if (answer.dataset.correct === "true") {
        answer.classList.add("correct");
      } else if (answer === selectedAnswer) {
        answer.classList.add("incorrect");
      }
    });
  }

  answersDisabled = true;
  currentQuestionIndex++;
  scoreSpanEl.textContent = score;
  const progressBarWidth = (currentQuestionIndex / totalQuestion) * 100 + "%";
  progressBarEl.style.width = progressBarWidth;
  setTimeout(() => {
    showQuestion();
  }, 1000);
}

function showResult() {
  quizScreenEl.classList.remove("active");
  resultScreenEl.classList.add("active");
  finalScoreEl.textContent = score;

  let message = "";

  const percentage = (score / totalQuestion) * 100;

  if (percentage === 100) {
    message = "Excellent !!! You are the Goat!";
  } else if (percentage >= 80) {
    message = "Greet ! You are a master!";
  } else if (percentage >= 40) {
    message = "Good ! Keep working, you almost done!";
  } else {
    message = "Not Bad ! Pratice Practice every day !";
  }

  resultMessageEl.textContent = message;
}

function restartQuiz() {
  resultScreenEl.classList.remove("active");
  startQuiz();
}
