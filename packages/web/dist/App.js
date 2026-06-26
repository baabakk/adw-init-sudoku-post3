import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Leaderboard from './components/Leaderboard';
import { useGame } from './hooks/useGame';
import styles from './styles/app.module.css';
const App = () => {
    const { board, difficulty, elapsed, inProgress, setCellValue, startNewGame, submitScore, setDifficulty, leaderboard, refreshLeaderboard, } = useGame();
    // Refresh leaderboard when difficulty changes or after a successful submit
    useEffect(() => {
        refreshLeaderboard();
    }, [difficulty, refreshLeaderboard]);
    return (_jsxs("div", { className: styles.container, children: [_jsx("h1", { children: "Sudoku" }), _jsx(Controls, { difficulty: difficulty, setDifficulty: setDifficulty, startNewGame: startNewGame, elapsed: elapsed, inProgress: inProgress, submitScore: submitScore }), _jsx(Board, { board: board, onCellChange: setCellValue, disabled: !inProgress }), _jsx(Leaderboard, { entries: leaderboard })] }));
};
export default App;
