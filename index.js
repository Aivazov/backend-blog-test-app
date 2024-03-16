const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json()); //alllow to read JSON before requests

app.get('/', (req, res) => {
  res.send('Hello from express.js in your browser!!');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body); //without using express.json() it will return "undefined"

  const token = jwt.sign(); //generating web token
  res.json({
    success: true,
  });
});

app.listen(2999, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
