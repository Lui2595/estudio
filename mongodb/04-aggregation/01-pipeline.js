/**
 * TEMA: Aggregation Pipeline
 * ENTREVISTA: ¿Cuándo usar aggregation vs find?
 *
 * Aggregation: transformaciones, agrupaciones, joins ($lookup), reportes.
 * find: queries simples con filtros.
 */

// Equivalente a GROUP BY + JOIN en SQL
const pipeline = [
  // $match: WHERE (hacer primero para reducir documentos)
  { $match: { status: 'published', createdAt: { $gte: new Date('2024-01-01') } } },

  // $lookup: LEFT JOIN con otra colección
  {
    $lookup: {
      from: 'users',
      localField: 'authorId',
      foreignField: '_id',
      as: 'author',
    },
  },
  { $unwind: '$author' },

  // $group: GROUP BY
  {
    $group: {
      _id: '$author._id',
      authorName: { $first: '$author.name' },
      postCount: { $sum: 1 },
      totalViews: { $sum: '$views' },
      avgViews: { $avg: '$views' },
    },
  },

  // $sort: ORDER BY
  { $sort: { postCount: -1 } },

  // $limit: LIMIT
  { $limit: 10 },

  // $project: SELECT columnas
  {
    $project: {
      _id: 0,
      authorId: '$_id',
      authorName: 1,
      postCount: 1,
      avgViews: { $round: ['$avgViews', 2] },
    },
  },
];

// await db.posts.aggregate(pipeline).toArray();

// Stages comunes:
// $match, $group, $sort, $limit, $skip, $project, $lookup, $unwind
// $addFields, $replaceRoot, $facet, $bucket, $count

export { pipeline };
