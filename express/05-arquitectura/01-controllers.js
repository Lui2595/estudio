/**
 * TEMA: Arquitectura — Controllers + Services
 * ENTREVISTA: ¿Dónde va la lógica de negocio en Express?
 *
 * Controller: HTTP layer (req/res, status codes, validación entrada)
 * Service: lógica de negocio pura (testeable sin Express)
 * Repository/Model: acceso a datos
 */

const { asyncHandler } = require('../04-errores/01-async-error-handling');
const userService = require('../services/userService');

// ─── Controller ───────────────────────────────────────
const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await userService.getAll({ page: +page, limit: +limit });
  res.json(result);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.remove(req.params.id);
  res.status(204).send();
});

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };

// ─── Routes (conecta router + middleware + controller) ─
// router.get('/', authenticate, getUsers);
// router.get('/:id', authenticate, getUserById);
// router.post('/', authenticate, validateCreateUser, createUser);
