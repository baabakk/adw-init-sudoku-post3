import { useState, useEffect, useCallback, useRef } from 'react';
import { PuzzleDifficulty, ScoreRequest, LeaderboardEntry } from '@init-sudoku-post3/contracts';
import { usePuzzleService } from './usePuzzleService.js';
import { useScoresService } from './useScoresService.js';
import { isValidMove } from '../utils/validation.js';

/**
 * Custom hook that encapsulates the entire game lifecycle.
 */
export const useGame = () => {
  // Game state
  const [board, setBoard] = useState<number[][]>(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [difficulty, setDifficulty] = useState<PuzzleDifficulty>('easy');
  const [elapsed, setElapsed] = useState<number>(0);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const timerRef = useRef<number | null>(null);

  const { fetchPuzzle, validateBoard } = usePuzzleService();
  const { postScore, fetchLeaderboard } = useScoresService();

  // Timer effect
  useEffect(() => {
    if (inProgress) {
      timerRef.current = window.setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
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
    const puzzle = await fetchPuzzle(difficulty);
    const newBoard = Array.isArray(puzzle.board) && puzzle.board.length === 9 ? puzzle.board : Array.from({ length: 9 }, () => Array(9).fill(0));
    setBoard(newBoard);
    setElapsed(0);
    setInProgress(true);
  }, [difficulty, fetchPuzzle]);

  const setCellValue = useCallback(
    (row: number, col: number, value: number) => {
      if (!inProgress) return;
      // Validate move client‑side; if invalid, ignore the change
      if (value !== 0 && !isValidMove(board, row, col, value)) {
        return;
      }
      setBoard((prev) => {
        const newBoard = prev.map((r) => r.slice());
        newBoard[row][col] = value;
        return newBoard;
      });
    },
    [board, inProgress]
  );

  const submitScore = useCallback(async () => {
    if (!inProgress) return;
    const validation = await validateBoard(board);
    if (!validation.correct) {
      alert('Board is not solved correctly.');
      return;
    }
    const payload: ScoreRequest = {
      playerName: 'Anonymous',
      difficulty,
      timeToSolve: elapsed,
    };
    await postScore(payload);
    setInProgress(false);
    await refreshLeaderboard();
  }, [board, difficulty, elapsed, inProgress, validateBoard, postScore]);

  const refreshLeaderboard = useCallback(async () => {
    const resp = await fetchLeaderboard(difficulty);
    setLeaderboard(resp.entries);
  }, [difficulty, fetchLeaderboard]);

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
