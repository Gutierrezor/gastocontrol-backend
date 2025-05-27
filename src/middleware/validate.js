import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(e => ({
        field: e.path,    // <-- aquí cambiamos de param a path
        msg: e.msg,
      })),
    });
  }
  next();
};
