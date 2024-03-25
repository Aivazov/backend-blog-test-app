import { body } from 'express-validator';

export const postCreationValidation = [
  body('title', "Please enter article's name")
    .isLength({
      min: 3,
    })
    .isString(),
  body('text', "Please enter article's text")
    .isLength({
      min: 10,
    })
    .isString(),
  body('tags', "Invalid tag's format (expect an array)").optional().isArray(),
  body('imageUrl', "Invalid image's URL").optional().isString(),
];
