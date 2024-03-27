// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const registerValidation = require('./validations/auth');
// const { validationResult } = require('express-validator');

import express from 'express';
import mongoose from 'mongoose';
import { loginValidation, registerValidation } from './validations/auth.js';
import { postCreationValidation } from './validations/post.js';
import checkAuth from './utils/checkAuth.js';
import { signup, signin, userInfo } from './controllers/UserController.js';
import {
  getAll,
  getOne,
  createPost,
  deletePost,
} from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://ivazowt:221477@cluster0.hap9szk.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
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

//
//
// REGISTER**************************************

app.post('/auth/signup', registerValidation, signup);

// LOGIN*******************************

app.post('/auth/signin', loginValidation, signin);

//  USERINFO ***********************************

app.get('/auth/user', checkAuth, userInfo);

//
// POSTS CRUD **********************************
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreationValidation, createPost);
app.delete('/posts/:id', checkAuth, deletePost);
// app.patch('/posts', updatePost);

//
// SERVER LISTENING
//

app.listen(2999, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
