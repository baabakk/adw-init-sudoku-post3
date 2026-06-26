/**
 * Simple wrapper around fetch for JSON APIs.
 * All requests are made relative to the dev server (proxy handles /puzzle, /validate, /scores, /leaderboard).
 */

export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GET ${url} failed: ${response.status} ${response.statusText} – ${text}`);
  }
  const data = (await response.json()) as T;
  return data;
};

export const apiPost = async <T>(url: string, payload: unknown): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`POST ${url} failed: ${response.status} ${response.statusText} – ${text}`);
  }
  const data = (await response.json()) as T;
  return data;
};
