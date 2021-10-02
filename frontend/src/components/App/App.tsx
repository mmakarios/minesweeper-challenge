import React from "react";
import Menu from "../Menu";
import GameBoard from "../GameBoard";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <h1>Minesweeper</h1>
      <Menu />
      <GameBoard />
    </div>
  );
}

export default App;
