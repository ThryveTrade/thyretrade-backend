const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'API is alive. Welcome to ThyreTrade.' });
});

exports.api = functions.https.onRequest(app);
