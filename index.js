const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express.js in your browser!!');
});

app.listen(2999, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
