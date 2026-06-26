# init-sudoku-post3 — shared foundation

Generated deterministically by DevOps from the approved project-decomposition.

**Stack:** TypeScript (npm workspaces)
- install: `npm install`
- build: `npm run build`
- test: `npm run test`

## Subsystems (one feature team each)
- **web-client** — Web Client: Browser SPA that renders a 9x9 Sudoku board, accepts player input, validates moves on the client, fetches puzzles from the Puzzle Service, and posts completed-game results to the Scores Service. Contains presentation and input handling only, no server-side business logic.
  - owns: packages/web
  - dependsOn: puzzle-service, scores-service
- **puzzle-service** — Puzzle Service: Stateless HTTP service that generates uniquely-solvable Sudoku puzzles at three difficulty levels (easy, medium, hard) and validates a submitted solution. Exposes GET /puzzle?difficulty= and POST /validate. Owns puzzle generation and solution checking only.
  - owns: packages/puzzle-service
  - dependsOn: none
- **scores-service** — Scores Service: HTTP service that records completed-game results (player name, difficulty, time-to-solve) and serves a per-difficulty top-10 leaderboard. Exposes POST /scores and GET /leaderboard?difficulty=. Owns persistence of scores only.
  - owns: packages/scores-service
  - dependsOn: none

## Shared contracts
- packages/contracts
