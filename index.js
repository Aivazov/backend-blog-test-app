const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express.js in your browser');
});

app.listen(3000, () => {
  console.log('Server OK');
});
