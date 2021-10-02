import React from "react";
import GameBoard from "../GameBoard";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <h1>Minesweeper</h1>
      <GameBoard></GameBoard>
    </div>
  );
}

export default App;
