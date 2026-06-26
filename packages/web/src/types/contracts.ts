// Re-export shared contract types for convenience within the web package.
// This file mirrors the contracts defined in the monorepo's contracts package.

export type PuzzleDifficulty = 'easy' | 'medium' | 'hard';

export interface PuzzleRequest {
  difficulty: PuzzleDifficulty;
}

export interface PuzzleResponse {
  board: number[][];
}

export interface ValidateRequest {
  board: number[][];
}

export interface ValidateResponse {
  correct: boolean;
}

export interface ScoreRequest {
  playerName: string;
  difficulty: PuzzleDifficulty;
  timeToSolve: number;
}

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
