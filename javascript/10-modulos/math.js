/**
 * TEMA: Import / Export (ES Modules)
 */

// Named exports
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// Default export (uno por módulo)
export default function subtract(a, b) {
  return a - b;
}
