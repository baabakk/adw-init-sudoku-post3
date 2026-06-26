# Scores Service

**Package:** `@init-sudoku-post3/scores-service`

## Overview

The Scores Service records completed Sudoku game results and provides a per‑difficulty top‑10 leaderboard.

- **POST `/scores`** – Record a player's result.
- **GET `/leaderboard?difficulty=easy|medium|hard`** – Retrieve the top 10 scores for the requested difficulty.

The service stores data in a local SQLite database (`data/scores.db`). It is built with **Express**, **better‑sqlite3**, and **TypeScript**.

## Prerequisites

- Node.js >= 18
- npm (included with Node)

## Installation

```bash
# From the monorepo root
npm install --include=dev
```

The workspace `package.json` already references this package, so the above command will install all dependencies, including `better-sqlite3` and its type definitions.

## Build

```bash
npm run build --workspace=@init-sudoku-post3/scores-service
```

Compiled files are emitted to `packages/scores-service/dist`.

## Run

```bash
npm start --workspace=@init-sudoku-post3/scores-service
```

The service listens on port `3000` by default (override with the `PORT` environment variable).

## API

### POST `/scores`

**Request Body** (`ScoreRequest` from `@init-sudoku-post3/contracts`):

```json
{
  "playerName": "string",
  "difficulty": "easy" | "medium" | "hard",
  "timeToSolve": number
}
```

**Response** (`ScoreResponse`):

```json
{ "id": "string" }
```

Returns `201 Created` on success, `400 Bad Request` if the payload is invalid.

### GET `/leaderboard?difficulty=`

**Query Parameter** – `difficulty` must be one of `easy`, `medium`, `hard`.

**Response** (`LeaderboardResponse`):

```json
{
  "entries": [
    { "playerName": "string", "timeToSolve": number },
    ... up to 10 entries ...
  ]
}
```

Returns `200 OK` on success, `400 Bad Request` for an invalid difficulty.

## Testing

Unit and integration tests are written with **Jest** and **supertest**.

```bash
npm test --workspace=@init-sudoku-post3/scores-service
```

All tests reside under `src/__tests__`.

## Project Structure

```
packages/scores-service/
├─ src/
│  ├─ index.ts               # Express app entry point
│  ├─ routes/
│  │  ├─ scores.ts           # POST /scores handler
│  │  └─ leaderboard.ts      # GET /leaderboard handler
│  ├─ db/
│  │  ├─ database.ts         # SQLite initialization
│  │  └─ scores-repository.ts# Repository functions
│  ├─ types.ts                # Re‑exports of contract types
│  └─ __tests__/             # Jest test suite
├─ jest.config.js
├─ package.json
├─ tsconfig.json
├─ .gitignore
└─ README.md
```

## License

MIT © 2026 Init Sudoku Project
