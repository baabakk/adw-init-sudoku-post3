"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = require("../validator");
const router = (0, express_1.Router)();
router.post('/validate', (req, res) => {
    const body = req.body;
    if (!body || !Array.isArray(body.board) || body.board.length !== 9) {
        return res.status(400).json({ error: 'Invalid request payload' });
    }
    const correct = (0, validator_1.validateSolution)(body.board);
    const response = { correct };
    res.json(response);
});
exports.default = router;
//# sourceMappingURL=validate.js.map