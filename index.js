// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const registerValidation = require('./validations/auth');
// const { validationResult } = require('express-validator');

import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import UserModel from './models/User.js';

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

app.post(
  '/auth/signup',
  registerValidation,
  // () => registerValidation,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const password = req.body.passwordHash;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash: hash,
        avatarUrl: req.body.avatarUrl,
      });

      const user = await doc.save();

      const token = jwt.sign(
        {
          _id: user._id,
        },
        'whateverYouWant',
        {
          expiresIn: '30d',
        }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({ ...userData, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Registration failure',
      });
    }
  }
);

//
//
// LOGIN*******************************

app.post('/auth/signin', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'The user was not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.passwordHash,
      user._doc.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid login or password',
      });
    }

    const token = jwt.sign({ _id: user._id }, 'whateverYouWant', {
      expiresIn: '30d',
    });

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Authorization failed',
    });
  }
});

app.listen(2999, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
