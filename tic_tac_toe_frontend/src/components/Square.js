import React from "react";

/**
 * @typedef {"X" | "O" | null} Cell
 */

// PUBLIC_INTERFACE
export default function Square({ value, index, isWinning, onClick }) {
  /** Single square (cell) on the board. */
  const label = value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      className={`square ${isWinning ? "squareWinning" : ""}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className={`mark ${value === "X" ? "markX" : value === "O" ? "markO" : ""}`}>
        {value ?? ""}
      </span>
    </button>
  );
}
