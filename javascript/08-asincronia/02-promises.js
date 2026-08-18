/**
 * TEMA: Promises
 * Estados: pending → fulfilled | rejected
 * 
 * Una Promise representa una tarea asíncrona; puede estar "pendiente" (pending), "cumplida" (fulfilled) o "rechazada" (rejected).
 */

// Simula una petición a un servidor que busca un usuario por id
const fetchUser = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Ana' }); // Si el id es válido, la promesa se resuelve con un objeto usuario
      } else {
        reject(new Error('ID inválido')); // Si no, se rechaza con un error
      }
    }, 1000); // Simula 1 seg de espera (asíncrono)
  });

// Encadenamiento (chaining) de Promesas
fetchUser(1)
  .then((user) => {
    console.log(user.name); // Imprime el nombre ('Ana')
    // Devuelve otra promesa, así el siguiente then espera a que termine
    return fetchUser(user.id);
  })
  .then((user) => console.log(user)) // Recibe el resultado de la nueva promesa
  .catch((error) => console.error(error)) // Maneja cualquier error de la cadena
  .finally(() => console.log('Terminado')); // Siempre se ejecuta al final (éxito o error)

// Promise.all: espera que TODAS las promesas de la lista se resuelvan exitosamente.
// Si alguna falla, todo falla.
// results será un array con los resultados de todas
const results = await Promise.all([
  fetchUser(1),
  fetchUser(2),
]);

// Promise.allSettled: espera todas, no importa si fallan o no.
// settled será un array donde cada elemento describe si se resolvió o rechazó y su valor o error.
const settled = await Promise.allSettled([
  fetchUser(1),
  fetchUser(-1), // Esta dará error, pero allSettled no "falla"
]);

// Promise.race: solo importa la PRIMERA que se resuelva o rechace.
const fastest = await Promise.race([
  fetchUser(1), // Se resuelve en 1 segundo
  new Promise((_, reject) => setTimeout(() => reject('timeout'), 500)), // Se rechaza en 0.5 segundos
]);
