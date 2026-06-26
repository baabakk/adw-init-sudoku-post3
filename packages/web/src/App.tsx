import React, { useEffect } from 'react';
import SudokuBoard from './components/SudokuBoard';
import Leaderboard from './components/Leaderboard';
import { useSudoku } from './hooks/useSudoku';
import styles from './styles/app.module.css';

const App: React.FC = () => {
  const {
    board,
    difficulty,
    elapsed,
    inProgress,
    setCellValue,
    startNewGame,
    submitScore,
    setDifficulty,
    leaderboard,
    refreshLeaderboard,
  } = useSudoku();

  // Refresh leaderboard when difficulty changes or after a successful submit
  useEffect(() => {
    refreshLeaderboard();
  }, [difficulty, refreshLeaderboard]);

  return (
    <div className={styles.container}>
      <h1>Sudoku</h1>
      <div className={styles.controls}>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            disabled={inProgress}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button onClick={startNewGame} disabled={inProgress}>
          New Game
        </button>
        <button onClick={submitScore} disabled={!inProgress}>
          Submit Score
        </button>
        <span>Time: {elapsed}s</span>
      </div>
      <SudokuBoard board={board} onCellChange={setCellValue} disabled={!inProgress} />
      <Leaderboard entries={leaderboard} />
    </div>
  );
};

export default App;
