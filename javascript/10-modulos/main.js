/**
 * TEMA: Import / Export - Uso
 */

import subtract, { PI, add, Calculator } from './math.js';

console.log(PI);           // 3.14159
console.log(add(2, 3));    // 5
console.log(subtract(5, 2)); // 3

const calc = new Calculator();
console.log(calc.multiply(4, 3)); // 12

// Import dinámico (lazy loading)
const module = await import('./math.js');

// Re-exportar
// export { add } from './math.js';
// export * from './math.js';
