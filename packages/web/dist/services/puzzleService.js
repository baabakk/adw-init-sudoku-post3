/**
 * Service for interacting with the Puzzle Service API.
 */
export const puzzleService = {
    /**
     * Fetch a new puzzle board for the given difficulty.
     */
    async fetchPuzzle(difficulty) {
        const req = { difficulty };
        const query = new URLSearchParams({ difficulty }).toString();
        const response = await fetch(`/puzzle?${query}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch puzzle: ${response.status}`);
        }
        const data = (await response.json());
        return data;
    },
    /**
     * Validate the completed board on the server.
     */
    async validateBoard(board) {
        const payload = { board };
        const response = await fetch('/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`Failed to validate board: ${response.status}`);
        }
        const data = (await response.json());
        return data;
    },
};
