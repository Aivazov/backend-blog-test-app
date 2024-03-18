const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { reqisterValidation } = require('./validations/auth');

mongoose
  .connect(
    'mongodb+srv://ivazowt:221477@cluster0.hap9szk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('MongoDatabase OK'))
  .catch((err) => console.error('Mongoose error', err));

const app = express();

app.use(express.json()); //allow to read JSON before requests

app.get('/', (req, res) => {
  res.send('Hello from express.js in your browser!!');
});

// app.post('/auth/login', (req, res) => {
//   console.log(req.body); //without using express.json() it will return "undefined"

//   const token = jwt.sign(
//     {
//       email: req.body.email,
//       fullName: 'Tim',
//       message: 'screwYourself',
//     },
//     'whateverYouWant'
//   ); //generating web token

//   res.json({
//     success: true,
//     token,
//   });
// });

// app.post('/auth/signup', reqisterValidation, (req, res) => {});
app.post('/auth/signup', (req, res) => {});

app.listen(2999, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
