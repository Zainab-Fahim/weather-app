const TOKEN_URL = process.env.REACT_APP_WEATHER_CHAT_TOKEN_URL;
const CLIENT_KEY=process.env.REACT_APP_WEATHER_CHAT_CLIENT_KEY;
const CLIENT_SECRET = process.env.REACT_APP_WEATHER_CHAT_CLIENT_SECRET;
const CHAT_API_URL = process.env.REACT_APP_WEATHER_CHAT_API_URL;

let cachedToken = null;
let tokenExpiry = null;

async function fetchAccessToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const credentials = btoa(`${CLIENT_KEY}:${CLIENT_SECRET}`);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error('Failed to fetch access token');
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export async function sendChatMessage(sessionId, message) {
  const token = await fetchAccessToken();
  const res = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, message }),
  });
  if (!res.ok) throw new Error('Failed to send chat message');
  const data = await res.json();
  return data;
} 