// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const registerValidation = require('./validations/auth');
// const { validationResult } = require('express-validator');
import express from 'express';
// import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';

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

app.post(
  '/auth/signup',
  registerValidation,
  // () => registerValidation,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    res.json({
      success: true,
    });
  }
);
// app.post('/auth/signup', (req, res) => {});

app.listen(2999, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
