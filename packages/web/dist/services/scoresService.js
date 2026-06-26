/**
 * Service for interacting with the Scores Service API.
 */
export const scoresService = {
    /**
     * Post a completed game score.
     */
    async postScore(payload) {
        const response = await fetch('/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`Failed to post score: ${response.status}`);
        }
        const data = (await response.json());
        return data;
    },
    /**
     * Fetch the leaderboard for a given difficulty.
     */
    async fetchLeaderboard(difficulty) {
        const query = new URLSearchParams({ difficulty }).toString();
        const response = await fetch(`/leaderboard?${query}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch leaderboard: ${response.status}`);
        }
        const data = (await response.json());
        return data;
    },
};
