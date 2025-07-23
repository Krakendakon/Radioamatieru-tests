import React from "react";
import "./App.css";

function HomePage({ onStart }) {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Radioamatiera Eksāmena Tests</h1>
      <p>Sāc testu un pārbaudi savas zināšanas!</p>
      <button onClick={onStart}>Startēt testu</button>
      <a href="https://github.com/Krakendakon/Radioamatieru-tests">Atvērtais kods</a>
    </div>
  );
}

export default HomePage;
