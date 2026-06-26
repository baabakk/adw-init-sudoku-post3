import React from 'react';
import { PuzzleDifficulty } from '@init-sudoku-post3/contracts';
import styles from '../styles/controls.module.css';

interface ControlsProps {
  difficulty: PuzzleDifficulty;
  setDifficulty: (d: PuzzleDifficulty) => void;
  startNewGame: () => void;
  elapsed: number;
  inProgress: boolean;
  submitScore: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Controls: React.FC<ControlsProps> = ({
  difficulty,
  setDifficulty,
  startNewGame,
  elapsed,
  inProgress,
  submitScore,
}) => {
  return (
    <div className={styles.controls}>
      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as PuzzleDifficulty)}
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
      <span className={styles.timer}>Time: {formatTime(elapsed)}</span>
      <button onClick={submitScore} disabled={!inProgress}>
        Submit Score
      </button>
    </div>
  );
};

export default Controls;
