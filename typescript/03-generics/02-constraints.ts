/**
 * TEMA: Generic Constraints (extends)
 * ENTREVISTA: ¿Cómo limitar un genérico?
 *
 * Cuando usamos genéricos (por ejemplo, <T>), muchas veces queremos que solo se acepten
 * tipos que tengan ciertas características (por ejemplo, que tengan una propiedad 'id').
 * Para eso, usamos 'extends' para restringir los posibles tipos del parámetro genérico T.
 * Esto aporta type safety y permite usar propiedades o métodos con la confianza de que existen.
 *
 * Ejemplo clásico: solo aceptar objetos con id
 */

interface HasId {
  id: number;
}

// Otro ejemplo: solo aceptar objetos que tengan 'length' (como arrays y strings)
interface HasLength {
  length: number;
}

/**
 * logLength acepta cualquier tipo T que al menos tenga un campo length:number.
 * Así, strings, arrays, y cualquier objeto con length funcionarán. Pero un número, por ejemplo, no.
 */
function logLength<T extends HasLength>(item: T): number {
  return item.length;
}

// Ejemplos:
logLength('hola');        // OK: string tiene length
logLength([1, 2, 3]);     // OK: Array tiene length
// logLength(42);         // Error: number NO tiene length

/**
 * findById acepta un array de elementos que deben tener un id:number. 
 * Si lo intentas con objetos que no tienen id, TypeScript marca error.
 */
function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

/**
 * Restricción por 'keyof': a veces queremos que un parámetro represente solo claves válidas de un objeto.
 * Usando K extends keyof T, aseguramos que K solo puede ser una de las propiedades de T (nunca una que no exista).
 * Esto previene errores de acceder propiedades inexistentes.
 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Ejemplo de uso:
// 'user' tiene id, name y email
const user = { id: 1, name: 'Ana', email: 'a@test.com' };
const name = getProperty(user, 'name'); // OK: 'name' es una key válida (resultado: string)
// getProperty(user, 'phone');          // Error en TS: 'phone' no existe en user

export { findById, getProperty };
