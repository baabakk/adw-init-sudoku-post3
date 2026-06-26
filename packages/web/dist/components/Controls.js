import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from '../styles/controls.module.css';
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
const Controls = ({ difficulty, setDifficulty, startNewGame, elapsed, inProgress, submitScore, }) => {
    return (_jsxs("div", { className: styles.controls, children: [_jsxs("label", { children: ["Difficulty:", _jsxs("select", { value: difficulty, onChange: (e) => setDifficulty(e.target.value), disabled: inProgress, children: [_jsx("option", { value: "easy", children: "Easy" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "hard", children: "Hard" })] })] }), _jsx("button", { onClick: startNewGame, disabled: inProgress, children: "New Game" }), _jsxs("span", { className: styles.timer, children: ["Time: ", formatTime(elapsed)] }), _jsx("button", { onClick: submitScore, disabled: !inProgress, children: "Submit Score" })] }));
};
export default Controls;
