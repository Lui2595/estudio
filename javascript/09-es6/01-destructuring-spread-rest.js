/**
 * TEMA: Destructuring, Spread, Rest
 */

const user = { id: 1, name: 'Ana', email: 'ana@test.com', role: 'admin' };

// Destructuring objeto
const { name, email, role: userRole } = user;
const { name: userName } = user; // Renombrar

// Destructuring con default
const { phone = 'N/A' } = user;

// Destructuring array
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Spread: expandir
const copy = { ...user, name: 'Luis' }; // Copia + override
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]

// Rest: recolectar
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// En destructuring de parámetros
function greet({ name, greeting = 'Hola' }) {
  return `${greeting}, ${name}`;
}
