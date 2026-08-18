/**
 * TEMA: Documentos, Colecciones y CRUD
 * ENTREVISTA: ¿Cuándo usar MongoDB en lugar de PostgreSQL/MySQL?
 *
 * MongoDB cuando:
 * - Esquema flexible o evolutivo
 * - Datos jerárquicos/anidados (logs, catálogos, CMS)
 * - Escrituras horizontales masivas con sharding
 * - Prototipado rápido
 *
 * NO MongoDB cuando:
 * - Transacciones complejas multi-tabla frecuentes
 * - JOINs intensivos entre entidades
 * - Integridad referencial estricta
 */

// Conexión (Node.js driver)
// const { MongoClient } = require('mongodb');
// const client = new MongoClient('mongodb://localhost:27017');
// const db = client.db('mi_app');
// const users = db.collection('users');

// INSERT ONE
const nuevoUsuario = {
  name: 'Ana García',
  email: 'ana@test.com',
  profile: {
    bio: 'Developer',
    social: { twitter: '@ana', github: 'ana-dev' },
  },
  tags: ['php', 'laravel', 'react'],
  isActive: true,
  createdAt: new Date(),
};

// await users.insertOne(nuevoUsuario);

// INSERT MANY
// await users.insertMany([{ name: 'Luis' }, { name: 'María' }]);

// FIND
// const user = await users.findOne({ email: 'ana@test.com' });
// const activos = await users.find({ isActive: true }).sort({ createdAt: -1 }).limit(10).toArray();

// UPDATE
// await users.updateOne(
//   { email: 'ana@test.com' },
//   { $set: { 'profile.bio': 'Senior Developer' }, $push: { tags: 'typescript' } }
// );

// DELETE
// await users.deleteOne({ email: 'ana@test.com' });

// Operadores de query comunes:
// $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin
// $and, $or, $not
// $exists, $regex
// $elemMatch (arrays)

export { nuevoUsuario };
