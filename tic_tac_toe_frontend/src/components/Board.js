import React from "react";
import Square from "./Square";

/**
 * @typedef {"X" | "O" | null} Cell
 */

// PUBLIC_INTERFACE
export default function Board({ squares, winningLine, onSquareClick }) {
  /** 3x3 board component. */
  return (
    <div className="boardWrap" aria-label="Tic Tac Toe board">
      <div className="board" role="grid" aria-label="3 by 3 grid">
        {squares.map((value, idx) => {
          const isWinning = Boolean(winningLine && winningLine.includes(idx));
          return (
            <Square
              key={idx}
              value={value}
              index={idx}
              isWinning={isWinning}
              onClick={() => onSquareClick(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
