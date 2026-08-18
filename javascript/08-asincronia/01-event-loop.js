/**
 * TEMA: Event Loop, Call Stack, Microtask Queue, Macrotask Queue
 * ENTREVISTA SENIOR: Explica el orden de ejecución en detalle.
 *
 * JavaScript es single-threaded: solo ejecuta una cosa a la vez (en el "Call Stack").
 * Pero usamos asincronía (setTimeout, Promises, etc.), y el mecanismo que organiza todo
 * es el Event Loop, que decide QUÉ se ejecuta y CUÁNDO, gestionando la sincronización
 * entre diferentes tipos de tareas.
 *
 * ▸ Call Stack: Pila donde se apilan las funciones en ejecución. Es LIFO (Last-In, First-Out; último en entrar, primero en salir).
 *               Todo el código síncrono (ejecución directa) se mete aquí.
 *
 * ▸ Microtask Queue: Cola para tareas de "alta prioridad". Aquí van los callbacks de Promesas (then/catch/finally),
 *                    y queueMicrotask(). Cuando el Call Stack queda vacío tras ejecutar el código síncrono,
 *                    SE EJECUTAN TODAS las microtasks pendientes (hasta vaciarse la cola, antes de tocar macrotasks).
 *
 * ▸ Macrotask Queue: Cola de tareas "normales", como los callbacks de setTimeout, setInterval, eventos I/O, etc.
 *                    El Event Loop ejecuta UNA macrotask, luego revisa las microtasks antes de avanzar con la siguiente.
 *
 * ORDEN de ejecución:
 *   1. Ejecuta el código en el Call Stack (código síncrono, las funciones directas).
 *   2. Vacía la Microtask Queue (todas).
 *   3. Ejecuta UNA Macrotask (la primera pendiente).
 *   4. Vuelve al paso 2: antes de la siguiente macrotask, SIEMPRE vacía todas las microtasks recientes.
 *   5. Repite este ciclo continuamente.
 */

// Vamos a ilustrarlo paso a paso:

console.log('1'); // Sincrónico: va DIRECTO al Call Stack y se ejecuta.

/*
  Aquí ocurre:
  - '1' se imprime.
  - Se programa (agenda) un setTimeout(() => ...) en la Macrotask Queue (va después).
  - Se crea una Promesa ya resuelta, y su .then se agenda a la Microtask Queue (ejecutar después del sync).
  - '4' se imprime directamente.
*/

setTimeout(() => console.log('2'), 0); // Macrotask: se agenda para luego.

Promise.resolve().then(() => console.log('3')); // Microtask: PROMISE (alta prioridad).

console.log('4'); // Sincrónico, ejecutado enseguida.

/*
ORDEN REAL de ejecución:
  1. '1' (síncrono)
  2. '4' (síncrono)
  3. Microtasks: '3' (promise)
  4. Macrotask: '2' (setTimeout)
*/

// Output: 1, 4, 3, 2

// ------------ Ejemplo más complejo, PASO a PASO ---------------

console.log('A'); // 1. Síncrono (Call Stack) => imprime 'A'

setTimeout(() => console.log('B'), 0); // 2. Agenda callback en Macrotask Queue

Promise.resolve()
  .then(() => {
    console.log('C');                 // 3. Microtask: imprime 'C'
    return Promise.resolve();          // Retorna otra promesa resuelta → encadena microtask
  })
  .then(() => console.log('D'));      // 4. Nueva microtask: imprime 'D' después de 'C'

console.log('E'); // 5. Síncrono (Call Stack) => imprime 'E'

/*
ORDER de ejecución detallado:
  - Call Stack: 'A' -> setTimeout (agendado) -> promesa (agendada .then) -> 'E'
  - AHORA EL CALL STACK QUEDA VACÍO → SE EJECUTAN TODAS LAS MICROTASKS (en orden de llegada):
     · Microtask 1: imprime 'C'
       → el .then anterior retorna Promise.resolve() => encadena otra microtask (imprimir 'D')
     · Microtask 2: imprime 'D'
  - Una vez NO hay más microtasks pendientes → se ejecuta UNA macrotask:
     · Macrotask 1: imprime 'B'
*/

// Output final: A, E, C, D, B

// Resumen visual del ciclo:
//   1. Código síncrono (Stack): A, E
//   2. Microtasks: C, D
//   3. Macrotasks: B
