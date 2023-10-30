import { parse } from 'cookie';

export async function fetcher(url: string, options: RequestInit) {
  try {
    let headers: RequestInit['headers'] = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
    const cookies = parse(document.cookie);
    if (cookies['roq-session-token']) {
      headers = {
        ...headers,
        Authorization: `Bearer ${cookies['roq-session-token']}`,
      };
    }
    const response = await fetch(url, {
      ...options,
      mode: 'cors',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json(); // Assuming the server returns error details as JSON
      throw new Error(`Error ${response.status}: ${response.statusText}\n${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error; // Re-throwing the error so it can be caught/handled by the calling code if needed
  }
}
