import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import SudokuBoard from './components/SudokuBoard';
import Leaderboard from './components/Leaderboard';
import { useSudoku } from './hooks/useSudoku';
import styles from './styles/app.module.css';
const App = () => {
    const { board, difficulty, elapsed, inProgress, setCellValue, startNewGame, submitScore, setDifficulty, leaderboard, refreshLeaderboard, } = useSudoku();
    // Refresh leaderboard when difficulty changes or after a successful submit
    useEffect(() => {
        refreshLeaderboard();
    }, [difficulty, refreshLeaderboard]);
    return (_jsxs("div", { className: styles.container, children: [_jsx("h1", { children: "Sudoku" }), _jsxs("div", { className: styles.controls, children: [_jsxs("label", { children: ["Difficulty:", _jsxs("select", { value: difficulty, onChange: (e) => setDifficulty(e.target.value), disabled: inProgress, children: [_jsx("option", { value: "easy", children: "Easy" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "hard", children: "Hard" })] })] }), _jsx("button", { onClick: startNewGame, disabled: inProgress, children: "New Game" }), _jsx("button", { onClick: submitScore, disabled: !inProgress, children: "Submit Score" }), _jsxs("span", { children: ["Time: ", elapsed, "s"] })] }), _jsx(SudokuBoard, { board: board, onCellChange: setCellValue, disabled: !inProgress }), _jsx(Leaderboard, { entries: leaderboard })] }));
};
export default App;
