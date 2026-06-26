"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puzzleGenerator_1 = require("../puzzleGenerator");
const router = (0, express_1.Router)();
router.get('/puzzle', (req, res) => {
    const difficulty = req.query.difficulty;
    if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
        return res.status(400).json({ error: 'Invalid or missing difficulty' });
    }
    const board = (0, puzzleGenerator_1.generatePuzzle)(difficulty);
    const response = { board };
    res.json(response);
});
exports.default = router;
//# sourceMappingURL=puzzle.js.map