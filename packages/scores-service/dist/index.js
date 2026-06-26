"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scores_1 = __importDefault(require("./routes/scores"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Mount routers
app.use(scores_1.default);
app.use(leaderboard_1.default);
// Simple health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// Error handling middleware (fallback)
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Scores service listening on port ${PORT}`);
    });
}
exports.default = app;
