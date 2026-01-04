// server.js - Backend proxy for Xaman API
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Your Xaman API credentials
const API_KEY = 'f6bbe135-9918-4b99-9f0b-32b3793696bb';
const API_SECRET = '70c268e1-acea-492f-8090-a4b68d225623';

// Enable CORS for all origins (or specify your frontend domain)
app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static('public'));

// Create payload endpoint
app.post('/api/payload', async (req, res) => {
  try {
    const response = await fetch('https://xumm.app/api/v1/platform/payload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
        'X-API-Secret': API_SECRET
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error creating payload:', error);
    res.status(500).json({ error: 'Failed to create payload' });
  }
});

// Get payload status endpoint
app.get('/api/payload/:uuid', async (req, res) => {
  try {
    const response = await fetch(`https://xumm.app/api/v1/platform/payload/${req.params.uuid}`, {
      headers: {
        'X-API-Key': API_KEY,
        'X-API-Secret': API_SECRET
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error getting payload status:', error);
    res.status(500).json({ error: 'Failed to get payload status' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});