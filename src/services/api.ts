const BASE_URL = process.env.API_BASE_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  if (!BASE_URL) {
    throw new Error('API_BASE_URL is not configured in .env.local');
  }

  const url = `${BASE_URL}${endpoint}`;

  let response: Response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('Could not reach the API. Check your connection and API URL.');
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // The error response may not contain JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null; // No content
  }

  try {
    return await response.json();
  } catch {
    throw new Error('The API returned an invalid JSON response.');
  }
}
