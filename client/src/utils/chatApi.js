const TOKEN_URL = process.env.REACT_APP_WEATHER_CHAT_TOKEN_URL;
const CLIENT_KEY=process.env.REACT_APP_WEATHER_CHAT_CLIENT_KEY;
const CLIENT_SECRET = process.env.REACT_APP_WEATHER_CHAT_CLIENT_SECRET;
const CHAT_API_URL = process.env.REACT_APP_WEATHER_CHAT_API_URL;

let cachedToken = null;
let tokenExpiry = null;

async function fetchAccessToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('Using cached access token');
    return cachedToken;
  }

  console.log('Fetching new access token...');
  const credentials = btoa(`${CLIENT_KEY}:${CLIENT_SECRET}`);
  console.log("token url",TOKEN_URL);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  console.log('Access token response status:', res.status);
  if (!res.ok) {
    console.error('Failed to fetch access token', await res.text());
    throw new Error('Failed to fetch access token');
  }
  const data = await res.json();
  console.log('Successfully fetched access token');
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export async function sendChatMessage(sessionId, message) {
  console.log(`Sending message: "${message}" in session: ${sessionId}`);
  const token = await fetchAccessToken();
  const res = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, message }),
  });
  console.log('Chat message response status:', res.status);
  if (!res.ok) {
    console.error('Failed to send chat message', await res.text());
    throw new Error('Failed to send chat message');
  }
  const data = await res.json();
  console.log('Received chat response:', data);
  return data;
} 