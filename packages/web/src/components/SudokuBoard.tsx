import React from 'react';
import Cell from './Cell';
import styles from './SudokuBoard.module.css';

interface SudokuBoardProps {
  board: number[][]; // 9x9 grid, 0 means empty
  onCellChange: (row: number, col: number, value: number) => void;
  disabled: boolean;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ board, onCellChange, disabled }) => {
  const handleChange = (row: number, col: number, val: string) => {
    const num = parseInt(val, 10);
    if (Number.isNaN(num) || num < 1 || num > 9) {
      onCellChange(row, col, 0);
    } else {
      onCellChange(row, col, num);
    }
  };

  return (
    <div className={styles.board}>
      {board.map((row, rIdx) => (
        <div key={rIdx} className={styles.row}>
          {row.map((cell, cIdx) => (
            <Cell
              key={cIdx}
              value={cell}
              onChange={(v) => handleChange(rIdx, cIdx, v)}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
