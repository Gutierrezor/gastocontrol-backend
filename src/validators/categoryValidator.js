import { body } from 'express-validator';

export const categoryRules = [
  body('name')
    .exists().withMessage('name es requerido')
    .isString().withMessage('name debe ser un texto')
    .isLength({ min: 2 }).withMessage('name debe tener al menos 2 caracteres'),
];