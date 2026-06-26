import {
  PuzzleDifficulty,
  ScoreRequest,
  ScoreResponse,
  LeaderboardEntry,
  LeaderboardResponse,
} from '@init-sudoku-post3/contracts';

// Re-export types for convenience within the scores-service package.
export type { PuzzleDifficulty };
export type ScoreInput = ScoreRequest;
export type ScoreOutput = ScoreResponse;
export type { LeaderboardEntry };
export type { LeaderboardResponse };
