import { body } from 'express-validator';

export const expenseRules = [
  body('amount')
    .exists().withMessage('amount es requerido')
    .isFloat({ gt: 0 }).withMessage('amount debe ser un número mayor que 0'),
  body('description')
    .optional()
    .isString().withMessage('description debe ser texto'),
  body('spentAt')
    .optional()
    .isISO8601().withMessage('spentAt debe ser una fecha válida'),
];