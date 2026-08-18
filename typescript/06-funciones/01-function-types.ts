/**
 * TEMA: Tipado de funciones
 * Function overloads, parámetros opcionales, rest, this.
 */

// Tipo de función
type BinaryOperation = (a: number, b: number) => number;

const sum: BinaryOperation = (a, b) => a + b;

// Parámetros opcionales y default
function greet(name: string, greeting = 'Hola'): string {
  return `${greeting}, ${name}`;
}

// Rest parameters
function join(separator: string, ...parts: string[]): string {
  return parts.join(separator);
}

// Function overloads: distintas firmas, una implementación
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}

// void vs undefined en retorno
type EventCallback = (event: Event) => void;

// Genéricos en funciones
function identity<T>(value: T): T {
  return value;
}

// Callback tipado (común en arrays y APIs)
type Mapper<T, U> = (item: T, index: number) => U;

const toUpper: Mapper<string, string> = (s) => s.toUpperCase();

export { sum, greet, join, format, identity, toUpper };
export type { BinaryOperation, EventCallback, Mapper };
