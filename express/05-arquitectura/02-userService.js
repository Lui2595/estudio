/**
 * TEMA: Service Layer
 * Lógica de negocio desacoplada de Express.
 */

const { NotFoundError, AppError } = require('../04-errores/01-async-error-handling');

// Simulación de "base de datos"
const users = new Map([
  ['1', { id: '1', name: 'Ana', email: 'ana@test.com' }],
  ['2', { id: '2', name: 'Luis', email: 'luis@test.com' }],
]);

async function getAll({ page, limit }) {
  const all = Array.from(users.values());
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    meta: { page, limit, total: all.length },
  };
}

async function getById(id) {
  const user = users.get(id);
  if (!user) throw new NotFoundError('Usuario');
  return user;
}

async function create({ name, email }) {
  if (!name || !email) {
    throw new AppError('name y email son requeridos', 422);
  }

  const id = String(Date.now());
  const user = { id, name, email };
  users.set(id, user);
  return user;
}

async function update(id, changes) {
  const user = await getById(id);
  const updated = { ...user, ...changes, id };
  users.set(id, updated);
  return updated;
}

async function remove(id) {
  if (!users.has(id)) throw new NotFoundError('Usuario');
  users.delete(id);
}

module.exports = { getAll, getById, create, update, remove };
