import { body } from 'express-validator';

export const incomeRules = [
  body('amount')
    .exists().withMessage('amount es requerido')
    .isFloat({ gt: 0 }).withMessage('amount debe ser un número mayor que 0'),
];