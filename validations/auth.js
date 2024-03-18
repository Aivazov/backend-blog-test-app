const { body } = require('express-validator');

const reqisterValidation = [
  body('email').isEmail(),
  body('passwordHash').isLength({ min: 5 }),
  body('fullName').isLength({ min: 2 }),
  body('avatarUrl').optional().isURL(),
];

module.exports = reqisterValidation;
