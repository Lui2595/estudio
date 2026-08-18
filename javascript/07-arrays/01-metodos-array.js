/**
 * TEMA: map, filter, reduce, find, some, every
 */

const users = [
  { id: 1, name: 'Ana', age: 25, active: true },
  { id: 2, name: 'Luis', age: 17, active: false },
  { id: 3, name: 'María', age: 30, active: true },
];

// map: transforma cada elemento → nuevo array
const names = users.map((u) => u.name);
// ['Ana', 'Luis', 'María']

// filter: filtra elementos → nuevo array
const adults = users.filter((u) => u.age >= 18);
// [{ id: 1, ... }, { id: 3, ... }]

// reduce: acumula a un solo valor
// reduce: recorre todos los usuarios y acumula la suma de sus edades en 'acc'.
// acc (acumulador) empieza en 0; en cada paso, le suma la edad del usuario actual (u.age);
// al final, totalAge tendrá la suma total de las edades de los usuarios.
const totalAge = users.reduce((acc, u) => {
  return acc + u.age; // suma la edad del usuario actual al acumulador
}, 0);
// 72

// find: primer elemento que cumple condición
const maria = users.find((u) => u.name === 'María');

// some: ¿alguno cumple?
const hasMinor = users.some((u) => u.age < 18); // true

// every: ¿todos cumplen?
const allNamed = users.every((u) => u.name.length > 0); // true

// Encadenamiento
const activeAdultNames = users
  .filter((u) => u.active && u.age >= 18)
  .map((u) => u.name.toUpperCase());
