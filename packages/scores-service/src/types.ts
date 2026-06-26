import { PuzzleDifficulty } from '@init-sudoku-post3/contracts';

/**
 * Local type definitions for the scores service. These mirror the shared contract
 * types but are defined here to keep the service self‑contained and to allow
 * future extensions without modifying the contracts package.
 */

export interface Score {
  playerName: string;
  difficulty: PuzzleDifficulty;
  timeToSolve: number;
}

export type ScoreRequest = Score;

export interface ScoreResponse {
  id: string;
}

export interface LeaderboardEntry {
  playerName: string;
  timeToSolve: number;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
}

export type { PuzzleDifficulty };
