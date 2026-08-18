/**
 * TEMA: Índices en MongoDB
 * ENTREVISTA: ¿Qué es un índice compuesto y cómo funciona ESR rule?
 *
 * ESR Rule (Equality, Sort, Range):
 * En índice compuesto, ordenar campos: = primero, sort segundo, range último
 */

// db.users.createIndex({ email: 1 }, { unique: true })
// db.users.createIndex({ isActive: 1, createdAt: -1 })
// db.posts.createIndex({ authorId: 1, status: 1, publishedAt: -1 })

// Single field
// { email: 1 }  → ascendente
// { createdAt: -1 } → descendente

// Compound index ESR example:
// Query: { status: 'published', authorId: X }.sort({ publishedAt: -1 }).limit(10)
// Índice ideal: { status: 1, authorId: 1, publishedAt: -1 }

// Text index (full-text)
// db.posts.createIndex({ title: 'text', body: 'text' })
// db.posts.find({ $text: { $search: 'mongodb laravel' } })

// TTL index: auto-delete documentos expirados
// db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })

// Partial index: solo documentos que cumplen filtro
// db.users.createIndex(
//   { email: 1 },
//   { partialFilterExpression: { isActive: true } }
// )

// explain() equivalente a EXPLAIN en SQL
// db.posts.find({ authorId: ObjectId('...') }).explain('executionStats')
// Buscar: totalDocsExamined vs nReturned (ideal: iguales)

// Covered query: proyección usa solo campos del índice
// db.users.find({ email: 'a@test.com' }, { email: 1, _id: 0 })

export {};
