/**
 * TEMA: Diseño de esquema — Embedding vs Referencing
 * ENTREVISTA MUY COMÚN: ¿Cuándo embeber y cuándo referenciar?
 *
 * Embedding (documentos anidados):
 * - Datos que se leen juntos siempre (1:1, 1:pocos)
 * - No crecen sin límite
 * - Ej: user.profile, order.items (pedido pequeño)
 *
 * Referencing (ObjectId):
 * - Relación 1:muchos sin límite
 * - Entidad compartida por muchos documentos
 * - Ej: post.author_id → users._id
 */

// EMBEDDING: blog post con comentarios limitados
const postEmbedded = {
  _id: '...',
  title: 'Intro a MongoDB',
  body: '...',
  author: { id: '...', name: 'Ana' }, // snapshot del autor
  comments: [
    { user: 'Luis', text: 'Excelente', createdAt: new Date() },
    { user: 'María', text: 'Gracias', createdAt: new Date() },
  ],
};

// REFERENCING: post con muchos comentarios
const postReferenced = {
  _id: '...',
  title: 'Intro a MongoDB',
  authorId: '507f1f77bcf86cd799439011', // ObjectId de users
  commentCount: 1523,
};

// comments collection (separada)
const comment = {
  _id: '...',
  postId: '507f1f77bcf86cd799439011',
  userId: '507f191e810c19729de860ea',
  text: 'Muy útil',
  createdAt: new Date(),
};

// Bucket pattern: agrupar muchos items en buckets
// Ej: 100 comentarios por documento "comment_bucket"
const commentBucket = {
  postId: '...',
  bucketNumber: 0,
  comments: [/* hasta 100 comentarios */],
};

// Regla práctica:
// ¿El array puede superar ~100-1000 elementos? → Referencing o Buckets
// ¿Siempre se leen juntos y son pocos? → Embedding

export { postEmbedded, postReferenced, comment, commentBucket };
