/**
 * TEMA: any vs unknown vs never
 * ENTREVISTA MUY COMÚN: ¿Cuándo usar unknown en lugar de any?
 *
 * any: desactiva el chequeo de tipos. Evitar en producción.
 * unknown: tipo seguro para valores desconocidos. Requiere narrowing antes de usar.
 * never: valores que nunca ocurren (funciones que siempre lanzan, switches exhaustivos).
 */

// MAL: any anula TypeScript
function procesarMal(dato: any) {
  return dato.toUpperCase(); // Sin error en compile, puede fallar en runtime
}

// BIEN: unknown obliga a validar
function procesarBien(dato: unknown): string {
  if (typeof dato === 'string') {
    return dato.toUpperCase();
  }
  throw new Error('Se esperaba un string');
}

// never: se usa para funciones que NUNCA retornan un valor útil.
// Útil para modelar errores irrecuperables o loops infinitos.
// Ejemplo 1: función que siempre lanza error (no retorna nada).
function lanzarError(mensaje: string): never {
  // Al lanzar un error, se detiene la ejecución y la función nunca "retorna".
  throw new Error(mensaje);
}

// Ejemplo 2: función con bucle infinito (nunca termina).
function bucleInfinito(): never {
  while (true) {
    // Itera para siempre, nunca retorna
  }
}

// never también se usa para verificar que los casos de un switch sean exhaustivos
// sobre un tipo discriminado. Así, si se agrega un nuevo tipo, TypeScript avisará
// si olvidaste cubrirlo.
type Forma =
  | { kind: 'circulo'; radio: number }
  | { kind: 'cuadrado'; lado: number };

// Calcula el área según el tipo de forma.
// El truco del never en el default: ayuda a detectar si falta un caso.
function area(forma: Forma): number {
  switch (forma.kind) {
    case 'circulo':
      // Narrowing: sabemos que hay 'radio'
      return Math.PI * forma.radio ** 2;
    case 'cuadrado':
      // Narrowing: sabemos que hay 'lado'
      return forma.lado ** 2;
    default:
      // Si olvidamos un tipo en el switch, TypeScript dará error aquí
      // porque 'forma' no podrá asignarse a never.
      const _exhaustivo: never = forma;
      // Esto es para ayudar a que el chequeo sea exhaustivo en tiempo de compilación.
      return _exhaustivo;
  }
}

export { procesarBien, area };
