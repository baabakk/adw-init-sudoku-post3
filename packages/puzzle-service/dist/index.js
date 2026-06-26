"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const puzzle_1 = __importDefault(require("./routes/puzzle"));
const validate_1 = __importDefault(require("./routes/validate"));
// Create Express application
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    // Mount routers
    app.use(puzzle_1.default);
    app.use(validate_1.default);
    // Simple health check
    app.get('/health', (_req, res) => res.send('OK'));
    return app;
};
exports.createApp = createApp;
// If this file is executed directly, start the server
if (require.main === module) {
    const PORT = process.env.PORT ?? 3000;
    const app = (0, exports.createApp)();
    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Puzzle service listening on port ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map