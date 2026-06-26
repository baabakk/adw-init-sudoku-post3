import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from '../styles/leaderboard.module.css';
const Leaderboard = ({ entries }) => {
    return (_jsxs("div", { className: styles.leaderboard, children: [_jsx("h2", { children: "Leaderboard" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Player" }), _jsx("th", { children: "Time (s)" })] }) }), _jsx("tbody", { children: entries.map((e, idx) => (_jsxs("tr", { children: [_jsx("td", { children: idx + 1 }), _jsx("td", { children: e.playerName }), _jsx("td", { children: e.timeToSolve })] }, idx))) })] })] }));
};
export default Leaderboard;
