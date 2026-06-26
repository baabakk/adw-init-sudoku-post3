"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../storage");
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
        // Cast after validation
        difficulty: body.difficulty,
        timeToSolve: body.timeToSolve,
    };
    const id = (0, storage_1.addScore)(score);
    const response = { id };
    res.status(201).json(response);
});
exports.default = router;
