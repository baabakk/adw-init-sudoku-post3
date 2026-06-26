import { jsx as _jsx } from "react/jsx-runtime";
import Cell from './Cell';
import styles from './SudokuBoard.module.css';
const SudokuBoard = ({ board, onCellChange, disabled }) => {
    const handleChange = (row, col, val) => {
        const num = parseInt(val, 10);
        if (Number.isNaN(num) || num < 1 || num > 9) {
            onCellChange(row, col, 0);
        }
        else {
            onCellChange(row, col, num);
        }
    };
    return (_jsx("div", { className: styles.board, children: board.map((row, rIdx) => (_jsx("div", { className: styles.row, children: row.map((cell, cIdx) => (_jsx(Cell, { value: cell, onChange: (v) => handleChange(rIdx, cIdx, v), disabled: disabled }, cIdx))) }, rIdx))) }));
};
export default SudokuBoard;
