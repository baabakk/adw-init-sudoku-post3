import { jsx as _jsx } from "react/jsx-runtime";
import styles from '../styles/board.module.css';
const Cell = ({ value, onChange, disabled }) => {
    const handleInput = (e) => {
        onChange(e.target.value);
    };
    return (_jsx("input", { className: styles.cell, type: "text", inputMode: "numeric", pattern: "[1-9]", maxLength: 1, value: value === 0 ? '' : value, onChange: handleInput, disabled: disabled }));
};
export default Cell;
