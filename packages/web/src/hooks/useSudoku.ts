import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  PuzzleDifficulty,
  ScoreRequest,
  LeaderboardEntry,
  PuzzleResponse,
  ValidateResponse,
} from '@init-sudoku-post3/contracts';
import { puzzleService } from '../services/puzzleService';
import { scoresService } from '../services/scoresService';
import { isValidMove } from '../utils/validation';

/**
 * Custom hook that encapsulates the Sudoku game lifecycle.
 */
export const useSudoku = () => {
  const [board, setBoard] = useState<number[][]>(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [difficulty, setDifficulty] = useState<PuzzleDifficulty>('easy');
  const [elapsed, setElapsed] = useState<number>(0);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const timerRef = useRef<number | null>(null);

  // Timer effect
  useEffect(() => {
    if (inProgress) {
      timerRef.current = window.setInterval(() => setElapsed((prev) => prev + 1), 1000);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [inProgress]);

  const startNewGame = useCallback(async () => {
    const puzzle: PuzzleResponse = await puzzleService.fetchPuzzle(difficulty);
    const newBoard = Array.isArray(puzzle.board) && puzzle.board.length === 9 ? puzzle.board : Array.from({ length: 9 }, () => Array(9).fill(0));
    setBoard(newBoard);
    setElapsed(0);
    setInProgress(true);
  }, [difficulty]);

  const setCellValue = useCallback(
    (row: number, col: number, value: number) => {
      if (!inProgress) return;
      if (value !== 0 && !isValidMove(board, row, col, value)) {
        // Invalid move – ignore
        return;
      }
      setBoard((prev) => {
        const copy = prev.map((r) => r.slice());
        copy[row][col] = value;
        return copy;
      });
    },
    [board, inProgress]
  );

  const submitScore = useCallback(async () => {
    if (!inProgress) return;
    const validation: ValidateResponse = await puzzleService.validateBoard(board);
    if (!validation.correct) {
      alert('Board is not solved correctly.');
      return;
    }
    const payload: ScoreRequest = {
      playerName: 'Anonymous',
      difficulty,
      timeToSolve: elapsed,
    };
    await scoresService.postScore(payload);
    setInProgress(false);
    await refreshLeaderboard();
  }, [board, difficulty, elapsed, inProgress]);

  const refreshLeaderboard = useCallback(async () => {
    const resp = await scoresService.fetchLeaderboard(difficulty);
    setLeaderboard(resp.entries);
  }, [difficulty]);

  return {
    board,
    difficulty,
    elapsed,
    inProgress,
    leaderboard,
    setCellValue,
    startNewGame,
    submitScore,
    setDifficulty,
    refreshLeaderboard,
  };
};
