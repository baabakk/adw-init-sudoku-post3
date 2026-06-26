import React from 'react';
import { LeaderboardEntry } from '@init-sudoku-post3/contracts';
interface LeaderboardProps {
    entries: LeaderboardEntry[];
}
declare const Leaderboard: React.FC<LeaderboardProps>;
export default Leaderboard;
