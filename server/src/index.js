const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const PORT = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }
    const response = await fetch('https://d4fb1e32-b3d2-4f23-a608-053637ab4490-prod.e1-us-east-azure.choreoapis.dev/default/weather-agent/v1.0/chat', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, message }),
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
      // Log the HTML error for debugging
      console.error('Non-JSON response from chat API:', data);
      return res.status(response.status).json({ error: 'Non-JSON response from chat API', details: data });
    }
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to proxy chat request', details: error.message });
  }
});

// Proxy route for token
app.post('/api/token', async (req, res) => {
  try {
    // Only forward necessary headers
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': req.headers['authorization'],
    };

    // Always encode the body as URLSearchParams
    const body = new URLSearchParams(req.body).toString();

    const response = await fetch('https://d4fb1e32-b3d2-4f23-a608-053637ab4490-prod.e1-us-east-azure.choreosts.dev/oauth2/token', {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to proxy token request', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 