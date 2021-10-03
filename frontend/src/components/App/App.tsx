import React from "react";
import Menu from "../Menu";
import Game from "../Game";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <h1>Minesweeper</h1>
        <Switch>
          <Route path="/:id">
            <Game />
          </Route>
          <Route path="/">
            <Menu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
