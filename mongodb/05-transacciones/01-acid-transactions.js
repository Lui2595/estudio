/**
 * TEMA: Transacciones multi-documento
 * ENTREVISTA: ¿MongoDB soporta ACID?
 *
 * Desde 4.0: transacciones multi-documento (requiere replica set).
 * Desde 4.2: transacciones en sharded clusters.
 */

// const session = client.startSession();

// try {
//   await session.withTransaction(async () => {
//     const accounts = db.collection('accounts');

//     await accounts.updateOne(
//       { _id: fromId },
//       { $inc: { balance: -amount } },
//       { session }
//     );

//     await accounts.updateOne(
//       { _id: toId },
//       { $inc: { balance: amount } },
//       { session }
//     );

//     // Si cualquier operación falla → rollback automático
//   });
// } finally {
//   await session.endSession();
// }

// Limitaciones vs PostgreSQL/MySQL:
// - Overhead mayor que transacciones SQL nativas
// - Tiempo máximo de transacción: 60 segundos default
// - No reemplaza integridad referencial automática

export {};
