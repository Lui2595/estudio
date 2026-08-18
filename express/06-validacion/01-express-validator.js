/**
 * TEMA: Validación con express-validator
 * ENTREVISTA: ¿Dónde validar: middleware, controller o service?
 *
 * Middleware: formato/tipo de entrada (HTTP concern)
 * Service: reglas de negocio (email único, stock disponible)
 */

const { body, param, query, validationResult } = require('express-validator');

// Middleware que ejecuta validaciones y retorna errores
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: 'Validación fallida',
      details: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

const validateCreateUser = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),

  body('email')
    .trim()
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe incluir mayúscula')
    .matches(/[0-9]/).withMessage('Debe incluir número'),

  validate,
];

const validateUserId = [
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  validate,
];

const validatePagination = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  validate,
];

module.exports = {
  validate,
  validateCreateUser,
  validateUserId,
  validatePagination,
};

// Uso:
// router.post('/', validateCreateUser, createUser);
// router.get('/:id', validateUserId, getUserById);
// router.get('/', validatePagination, getUsers);
