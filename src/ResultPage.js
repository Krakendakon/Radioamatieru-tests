import React from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

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

function ResultPage({ score, total, userAnswers }) {
  const mistakes = userAnswers.filter(
    (ans) => ans.selectedAnswer !== ans.question.answer
  );

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Rezultāts</h1>
      <p>
        Tu atbildēji pareizi uz {score} no {total} jautājumiem.
      </p>

      {mistakes.length > 0 ? (
        <>
          <h2>Kļūdas un Paskaidrojumi</h2>
          {mistakes.map((m, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                margin: "1rem 0",
                padding: "1rem",
              }}
            >
              <p>
                <strong>Jautājums:</strong> {renderMaybeMath(m.question.question)}
              </p>
              <p>
                <span style={{ color: "red" }}>Tava atbilde:</span>{" "}
                {renderMaybeMath(m.selectedAnswer)}
              </p>
              <p>
                <span style={{ color: "green" }}>Pareizā atbilde:</span>{" "}
                {renderMaybeMath(m.question.answer)}
              </p>
              {m.question.explanation && (
                <p>
                  <em>Paskaidrojums:</em> {renderMaybeMath(m.question.explanation)}
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>Super! Viss pareizi!</p>
      )}

      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => window.location.reload()}>
          Mēģināt vēlreiz
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
