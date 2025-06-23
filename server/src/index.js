const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const serverless = require('serverless-http');

const app = express();

// ─── 1) UNIVERSAL CORS + PRE-FLIGHT ────────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ─── 2) BODY PARSING ────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── 3) HEALTH CHECK ───────────────────────────────────────────────
app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

// ─── 4) TOKEN PROXY ────────────────────────────────────────────────
app.post('/api/token', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const headers = {
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    };
    const body = new URLSearchParams(req.body).toString();

    const response = await fetch(
      'https://d4fb1e32-b3d2-4f23-a608-053637ab4490-prod.e1-us-east-azure.choreoapis.dev/oauth2/token',
      { method: 'POST', headers, body }
    );
    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    console.error('Token proxy error:', err);
    return res
      .status(500)
      .json({ error: 'Failed to proxy token request', details: err.message });
  }
});

// ─── 5) CHAT PROXY ─────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const response = await fetch(
      'https://d4fb1e32-b3d2-4f23-a608-053637ab4490-prod.e1-us-east-azure.choreoapis.dev/default/weather-agent/v1.0/chat',
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({ sessionId, message }),
      }
    );

    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    const text = await response.text();
    console.error('Non-JSON response from chat API:', text);
    return res
      .status(response.status)
      .json({ error: 'Non-JSON response', details: text });

  } catch (err) {
    console.error('Chat proxy error:', err);
    return res
      .status(500)
      .json({ error: 'Failed to proxy chat request', details: err.message });
  }
});

// ─── 6) LOCAL LISTEN FOR DEBUG ───────────────────────────────────────
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`⚡️ Server listening locally at http://localhost:${port}/api`);
  });
}

// ─── 7) EXPORT FOR VERCEL ────────────────────────────────────────────
module.exports = app;
module.exports.handler = serverless(app);
