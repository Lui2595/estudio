/**
 * TEMA: Type Guards y Narrowing en TypeScript
 *
 * ¿Qué es Narrowing?
 * Es el proceso por el cual reducimos un tipo unión (por ejemplo, string | number)
 * a un tipo más específico en tiempo de ejecución, para acceder de forma segura
 * a las propiedades o métodos de un tipo concreto.
 * 
 * Para lograr esto usamos "type guards" o protecciones de tipo.
 * Veamos los principales mecanismos:
 */

/**
 * Ejemplo de dos interfaces incompatibles
 */
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

/**
 * Type guard usando typeof
 * Podemos distinguir entre tipos primitivos usando typeof.
 */
function padLeft(value: string, padding: string | number): string {
  if (typeof padding === 'number') {
    // Si padding es número, agregamos espacios
    return ' '.repeat(padding) + value;
  }
  // Si padding es string, lo concatenamos directamente
  return padding + value;
}

/**
 * Type guard usando in y instanceof
 * Con objetos, usamos 'in' para ver si existe una propiedad,
 * y 'instanceof' para chequear contra una clase/constructor.
 */
function move(animal: Fish | Bird) {
  // 'swim' solo existe en Fish
  if ('swim' in animal) {
    animal.swim();
  } else {
    // Si no tiene swim, asumimos que es Bird
    animal.fly();
  }
}

/**
 * Type guard personalizada con predicado de tipo (pet is Fish)
 * Esto es útil para usarlo luego en condicionales y que TypeScript entienda el tipo.
 */
function isFish(pet: Fish | Bird): pet is Fish {
  return 'swim' in pet;
}

// Ejemplo de uso de type guard personalizada
function interact(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // Aquí TypeScript sabe que pet es Fish
  } else {
    pet.fly();  // Aquí pet es Bird
  }
}

/**
 * Función de aserción (assertion function)
 * Nos permite afirmar que un valor cumple una condición de tipo,
 * y TypeScript lo sabrá si no lanza error.
 */
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('No es un número');
  }
}

// Uso típico de assert: después de pasar el assert, value es number
function calc(value: unknown) {
  assertIsNumber(value);
  // Ahora TS sabe que value es number sin necesidad de cast
  return value * 2;
}

export { padLeft, isFish, interact, calc };
