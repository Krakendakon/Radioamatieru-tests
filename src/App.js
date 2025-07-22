import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  
  useEffect(() => {
    document.title = "Radioamatieru Tests"; // ✅ Set dynamic title
  }, []);
  
  // Dark mode state with persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestions(shuffled);
      });
  }, []);

  // Apply dark mode class to body & save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleAnswer = (selected) => {
    const currentQuestion = questions[currentIdx];

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedAnswer: selected,
      },
    ]);

    if (selected === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  // Show toggle button on all screens
  const darkModeToggleBtn = (
    <button
      style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );

  if (!started)
    return (
      <>
        {darkModeToggleBtn}
        <HomePage onStart={() => setStarted(true)} />
      </>
    );

  if (showResult)
    return (
      <>
        {darkModeToggleBtn}
        <ResultPage score={score} total={questions.length} userAnswers={userAnswers} />
      </>
    );

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <>
      {darkModeToggleBtn}
      <QuestionPage
        question={questions[currentIdx]}
        idx={currentIdx}
        total={questions.length}
        onAnswer={handleAnswer}
      />
    </>
  );
}

export default App;
