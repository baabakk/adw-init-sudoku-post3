import React, { useEffect } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Leaderboard from './components/Leaderboard';
import { useGame } from './hooks/useGame';
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
  } = useGame();

  // Refresh leaderboard when difficulty changes or after a successful submit
  useEffect(() => {
    refreshLeaderboard();
  }, [difficulty, refreshLeaderboard]);

  return (
    <div className={styles.container}>
      <h1>Sudoku</h1>
      <Controls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        startNewGame={startNewGame}
        elapsed={elapsed}
        inProgress={inProgress}
        submitScore={submitScore}
      />
      <Board board={board} onCellChange={setCellValue} disabled={!inProgress} />
      <Leaderboard entries={leaderboard} />
    </div>
  );
};

export default App;
