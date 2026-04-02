import React, { useCallback, useMemo, useState } from "react";
import Board from "./Board";

/**
 * @typedef {"X" | "O" | null} Cell
 */

const INITIAL_BOARD = /** @type {Cell[]} */ (Array(9).fill(null));

/**
 * Determine winner if any.
 * @param {Cell[]} squares
 * @returns {{winner: "X" | "O" | null, line: number[] | null}}
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

/**
 * @param {Cell[]} squares
 * @returns {boolean}
 */
function isDraw(squares) {
  return squares.every((c) => c !== null);
}

// PUBLIC_INTERFACE
export default function TicTacToe() {
  /** Main Tic Tac Toe game component. */
  const [squares, setSquares] = useState(INITIAL_BOARD);
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => !winner && isDraw(squares), [winner, squares]);

  const nextPlayer = xIsNext ? "X" : "O";

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "Draw — no more moves";
    return `Next player: ${nextPlayer}`;
  }, [winner, draw, nextPlayer]);

  const handleSquareClick = useCallback(
    (idx) => {
      // Ignore clicks if game ended or square already filled.
      if (winner || squares[idx]) return;

      setSquares((prev) => {
        const copy = prev.slice();
        copy[idx] = xIsNext ? "X" : "O";
        return copy;
      });
      setXIsNext((prev) => !prev);
    },
    [winner, squares, xIsNext]
  );

  const resetGame = useCallback(() => {
    setSquares(INITIAL_BOARD);
    setXIsNext(true);
  }, []);

  return (
    <div className="game">
      <div className="gameTop">
        <div className="statusRow" role="status" aria-live="polite">
          <span className={`statusPill ${winner ? "statusWin" : draw ? "statusDraw" : "statusNext"}`}>
            {status}
          </span>
        </div>

        <div className="indicatorRow" aria-label="Move indicators">
          <div className={`indicator ${nextPlayer === "X" && !winner && !draw ? "indicatorActive" : ""}`}>
            <span className="indicatorLabel">Player</span>
            <span className="indicatorValue indicatorX">X</span>
          </div>
          <div className={`indicator ${nextPlayer === "O" && !winner && !draw ? "indicatorActive" : ""}`}>
            <span className="indicatorLabel">Player</span>
            <span className="indicatorValue indicatorO">O</span>
          </div>
        </div>
      </div>

      <Board squares={squares} winningLine={line} onSquareClick={handleSquareClick} />

      <div className="gameBottom">
        <button className="button" type="button" onClick={resetGame}>
          Reset game
        </button>
        <p className="hint">
          Tip: You can reset anytime. Winning line highlights automatically.
        </p>
      </div>
    </div>
  );
}
