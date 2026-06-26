"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../storage");
const router = (0, express_1.Router)();
/**
 * GET /leaderboard?difficulty=easy|medium|hard
 * Returns the top 10 leaderboard entries for the given difficulty.
 */
router.get('/leaderboard', (req, res) => {
    const difficulty = req.query.difficulty;
    if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
        return res.status(400).json({ error: 'Invalid or missing difficulty parameter' });
    }
    const entries = (0, storage_1.getTopScores)(difficulty);
    const response = { entries };
    res.json(response);
});
exports.default = router;
