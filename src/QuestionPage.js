import React, { useState } from "react";
import "./App.css";

function QuestionPage({ question, idx, total, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected !== null) {
      onAnswer(selected);
      setSelected(null);
    }
  };

  return (
    <div className="container">
      <h2>{`Jautājums ${idx + 1} / ${total}`}</h2>
      <p>{question.question}</p>
      {question.options.map((opt, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
            />
            {opt}
          </label>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={selected === null}>
        Apstiprināt / Nākamais
      </button>
    </div>
  );
}

export default QuestionPage;
