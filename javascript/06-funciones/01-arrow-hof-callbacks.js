/**
 * TEMA: Arrow Functions, Higher Order Functions, Callbacks
 *
 * En este archivo repasamos tres conceptos fundamentales de JavaScript moderno:
 * 
 * 1. Arrow functions (funciones flecha): Son una sintaxis más corta para escribir funciones. NO tienen su propio this (heredan el del contexto padre),
 *    no pueden ser usadas como constructores y son ideales para funciones sencillas.
 * 
 * 2. Higher Order Functions (Funciones de Orden Superior): Son funciones que reciben una función como argumento, devuelven una función, o ambas cosas.
 *    Esto permite crear patrones muy potentes y reutilizables, como logs automáticos, validaciones, decoradores, etc.
 *
 * 3. Callbacks: Son funciones que pasamos como argumento a otra función, esperando que la ejecute en el futuro, por ejemplo, tras completar una tarea asíncrona.
 */

// ---------- ARROW FUNCTIONS ----------
// Sintaxis corta para funciones.
// No tienen su propio 'this', sino que heredan del contexto donde fueron creadas.
const duplicar = (n) => n * 2; // Equivalente a: function duplicar(n) { return n * 2; }
const sumar = (a, b) => a + b; // Suma dos valores
// Si queremos retornar un objeto, usamos paréntesis:
const crearUsuario = (name) => ({ name, createdAt: new Date() }); // Retorna un objeto usuario

// ---------- HIGHER ORDER FUNCTIONS ----------
// Funciones que reciben O retornan otras funciones.
// Esto permite "envolver" o modificar comportamientos sin duplicar código.

function withLogging(fn) {
  // Devuelve una nueva función que hace log antes y después
  return (...args) => {
    console.log('Llamando con:', args);
    const result = fn(...args);
    console.log('Resultado:', result);
    return result;
  };
}

// Ejemplo: ahora loggedSum es como sumar, ¡pero con logs automáticos!
const loggedSum = withLogging((a, b) => a + b);
loggedSum(2, 3); // "Llamando con: [2,3]" y luego "Resultado: 5"

// ---------- CALLBACKS ----------
// Una función callback es una función que se pasa como argumento a otra.
// Se usan mucho con código asíncrono, como cuando pedimos datos a una API.

function fetchData(url, onSuccess, onError) {
  // Imaginemos que pedimos datos con AJAX/fetch/etc...
  // (Aquí solo simulamos, pero en la vida real sería asíncrono)
  const success = true; // Supongamos que fue bien (prueba cambiar a false)
  if (success) onSuccess({ data: 'resultado' }); // Llama al callback de éxito
  else onError(new Error('Falló')); // Llama al callback de error
}

// Usamos fetchData pasando dos callbacks: uno para éxito y otro para error.
fetchData(
  '/api/users',
  (response) => console.log('Éxito! Respuesta:', response),
  (error) => console.error('Error:', error)
);

// Es un patrón fundamental para entender asincronía en JS (y base de Promesas).