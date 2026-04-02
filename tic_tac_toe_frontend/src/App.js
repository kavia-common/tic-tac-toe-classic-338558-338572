import React from "react";
import TicTacToe from "./components/TicTacToe";

// PUBLIC_INTERFACE
function App() {
  /** Root application component. */
  return (
    <div className="app">
      <main className="appShell" aria-label="Tic Tac Toe App">
        <header className="appHeader">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="subtitle">
            Two players. Take turns. First to 3 in a row wins.
          </p>
        </header>

        <section className="card" aria-label="Game">
          <TicTacToe />
        </section>

        <footer className="footer">
          <span className="footerText">Classic game • Modern light theme</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
