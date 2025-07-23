import React from "react";
import "./App.css";

function HomePage({ onStart }) {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Radioamatiera Eksāmena Tests</h1>
      <p>Sāc testu un pārbaudi savas zināšanas!</p>
      <button onClick={onStart}>Startēt testu</button>
            <div style={{ marginTop: "1rem" }}>
        <a 
          href="https://github.com/Krakendakon/Radioamatieru-tests" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#0366d6", fontWeight: "bold" }}
        >
          Atvērtais kods
        </a>
      </div>
    </div>
  );
}

export default HomePage;
