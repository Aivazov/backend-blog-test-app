// const { body } = require('express-validator');
import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Please enter correct email').isEmail(),
  body('passwordHash', 'password has to be minimum 5 symbols').isLength({
    min: 5,
  }),
  body('fullName', 'Name has to be minimum 2 letters').isLength({ min: 2 }),
  body('avatarUrl', 'uncorrect URL').optional().isURL(),
];

// module.exports = registerValidation;

//body('param1 validation var', 'param2 is message')
