import { PuzzleDifficulty, LeaderboardEntry } from '@init-sudoku-post3/contracts';
/**
 * Custom hook that encapsulates the entire game lifecycle.
 */
export declare const useGame: () => {
    board: number[][];
    difficulty: PuzzleDifficulty;
    elapsed: number;
    inProgress: boolean;
    leaderboard: LeaderboardEntry[];
    setCellValue: (row: number, col: number, value: number) => void;
    startNewGame: () => Promise<void>;
    submitScore: () => Promise<void>;
    setDifficulty: import("react").Dispatch<import("react").SetStateAction<PuzzleDifficulty>>;
    refreshLeaderboard: () => Promise<void>;
};
