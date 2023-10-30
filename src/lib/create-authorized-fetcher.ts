import { NextApiRequest } from 'next';

export function createAuthorizedFetcher(req: NextApiRequest) {
  return async function fetcher(url: string, options: RequestInit = {}, params?: Record<string, any>) {
    if (params) {
      url = url + '?' + `q=${encodeURIComponent(JSON.stringify(params))}`;
    }

    const cookies = req.headers.cookie;

    const response = await fetch(url, {
      ...options,
      mode: 'cors',
      credentials: 'include',
      headers: {
        ...(cookies ? { cookie: cookies } : {}), // Include cookies if present
        'Content-Type': 'application/json', // Set the content type to JSON
        ...options.headers, // Override with any additional headers specified in options
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${response.statusText}\n${JSON.stringify(errorData)}`);
    }

    return await response.json();
  };
}
