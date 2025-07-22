import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./App.css";
function renderMaybeMath(text) {
  // Remove $$ delimiters if present
  const cleaned = text.replace(/^\$\$(.*)\$\$$/, "$1");

  const mathIndicators = [
    "\\frac",
    "\\times",
    "\\sqrt",
    "\\%",
    "^",
    "_",
    "{",
    "}",
    "\\alpha",
    "\\beta",
    "\\gamma",
  ];

  const hasMath = mathIndicators.some((ind) => cleaned.includes(ind));
  if (hasMath) {
    return <InlineMath math={cleaned} />;
  }
  return <span>{text}</span>;
}

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

      {/* Question text */}
      <p>{renderMaybeMath(question.question)}</p>

      {/* Optional image */}
      {question.image && (
        <div className="image-container">
          <img
            src={question.image}
            alt="Uzdevuma attēls"
            style={{ maxWidth: "100%", height: "auto", margin: "10px 0" }}
          />
        </div>
      )}

      {/* Options */}
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
            {renderMaybeMath(opt)}
          </label>
        </div>
      ))}

      {/* Submit button */}
      <button onClick={handleSubmit} disabled={selected === null}>
        Apstiprināt / Nākamais
      </button>
    </div>
  );
}

export default QuestionPage;
