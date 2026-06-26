"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scores_repository_1 = require("../db/scores-repository");
const router = (0, express_1.Router)();
/**
 * POST /scores
 * Accepts a ScoreRequest and returns a ScoreResponse with the generated id.
 */
router.post('/scores', (req, res) => {
    const body = req.body;
    // Basic validation
    if (typeof body.playerName !== 'string' ||
        typeof body.difficulty !== 'string' ||
        typeof body.timeToSolve !== 'number') {
        return res.status(400).json({ error: 'Invalid request payload' });
    }
    const score = {
        playerName: body.playerName,
        difficulty: body.difficulty,
        timeToSolve: body.timeToSolve,
    };
    const id = (0, scores_repository_1.insertScore)(score);
    const response = { id };
    res.status(201).json(response);
});
exports.default = router;
