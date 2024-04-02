// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const signupValidation = require('./validations/auth');
// const { validationResult } = require('express-validator');

import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { signinValidation, signupValidation } from './validations/auth.js';
import { postCreationValidation } from './validations/post.js';
import cors from 'cors';

import { checkAuth, handleValidationsErrs } from './utils/index.js';

import { signup, signin, userInfo } from './controllers/UserController.js';
import {
  getAll,
  getOne,
  createPost,
  deletePost,
  updatePost,
} from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://ivazowt:221477@cluster0.hap9szk.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('MongoDatabase OK'))
  .catch((err) => console.error('Mongoose error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname); //originalname without camelcase
  },
}); //creating space for uploading files inside of our project

const upload = multer({ storage });
app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use(express.json()); //allow to read JSON before requests
app.use(cors());
app.use('/uploads', express.static('uploads')); //giving access to 'uploads' folder and contains

app.get('/', (req, res) => {
  res.send('Hello from express.js in your browser');
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

app.post('/auth/signup', signupValidation, handleValidationsErrs, signup);

// LOGIN*******************************

app.post('/auth/signin', signinValidation, handleValidationsErrs, signin);

//  USERINFO ***********************************

app.get('/auth/user', checkAuth, userInfo);

//
// POSTS CRUD **********************************
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post(
  '/posts',
  checkAuth,
  postCreationValidation,
  handleValidationsErrs,
  createPost
);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreationValidation,
  handleValidationsErrs,
  checkAuth,
  updatePost
);

//
// SERVER LISTENING
//

app.listen(2999, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
