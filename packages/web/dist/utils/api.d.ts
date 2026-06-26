/**
 * Simple wrapper around fetch for JSON APIs.
 * All requests are made relative to the dev server (proxy handles /puzzle, /validate, /scores, /leaderboard).
 */
export declare const apiGet: <T>(url: string) => Promise<T>;
export declare const apiPost: <T>(url: string, payload: unknown) => Promise<T>;
