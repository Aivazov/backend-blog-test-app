// const { body } = require('express-validator');
import { body } from 'express-validator'

export const registerValidation = [
  body('email').isEmail(),
  body('passwordHash').isLength({ min: 5 }),
  body('fullName').isLength({ min: 2 }),
  body('avatarUrl').optional().isURL(),
];

// module.exports = registerValidation;
