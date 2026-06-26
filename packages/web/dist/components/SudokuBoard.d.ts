import React from 'react';
interface SudokuBoardProps {
    board: number[][];
    onCellChange: (row: number, col: number, value: number) => void;
    disabled: boolean;
}
declare const SudokuBoard: React.FC<SudokuBoardProps>;
export default SudokuBoard;
