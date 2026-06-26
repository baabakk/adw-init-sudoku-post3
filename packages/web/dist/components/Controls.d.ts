import React from 'react';
import { PuzzleDifficulty } from '@init-sudoku-post3/contracts';
interface ControlsProps {
    difficulty: PuzzleDifficulty;
    setDifficulty: (d: PuzzleDifficulty) => void;
    startNewGame: () => void;
    elapsed: number;
    inProgress: boolean;
    submitScore: () => void;
}
declare const Controls: React.FC<ControlsProps>;
export default Controls;
