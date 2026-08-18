/**
 * TEMA: Tipos básicos y anotaciones
 * ENTREVISTA: ¿Cuándo anotar tipos explícitamente?
 *
 * TypeScript infiere tipos cuando puede. Anota cuando:
 * - La inferencia es demasiado amplia (let x = [] → any[])
 * - Defines contratos públicos (APIs, props, parámetros de librería)
 */

// Tipos primitivos
const nombre: string = 'Ana';
const edad: number = 30;
const activo: boolean = true;
const nulo: null = null;
const indefinido: undefined = undefined;

// Arrays
const numeros: number[] = [1, 2, 3];
const tags: Array<string> = ['ts', 'react'];

// Tuplas: longitud y tipos fijos
const punto: [number, number] = [10, 20];
const respuesta: [boolean, string] = [true, 'OK'];

// Inferencia (preferir cuando es obvio)
const ciudad = 'Madrid'; // string
const items = [1, 2, 3]; // number[]

// void: función sin retorno útil
function log(mensaje: string): void {
  console.log(mensaje);
}

// object genérico (evitar, preferir interfaces concretas)
const config: { host: string; port: number } = { host: 'localhost', port: 3000 };

export { nombre, edad, punto };
