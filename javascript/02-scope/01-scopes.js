/**
 * TEMA: Global, Function y Block Scope
 */

// Global Scope
const globalVar = 'soy global';

function ejemplo() {
  // Function Scope
  var functionScoped = 'solo dentro de la función';

  if (true) {
    // Block Scope
    let blockScoped = 'solo dentro del bloque';
    const otro = 'también block scoped';
  }

  // console.log(blockScoped); // ReferenceError
}

// Lexical Scope: las funciones internas acceden al scope padre
function outer() {
  const mensaje = 'Hola';

  function inner() {
    console.log(mensaje); // Accede al scope de outer
  }

  return inner;
}
// IIFE (Immediately Invoked Function Expression): crear scope privado
(function () {
  const secreto = 'privado';
  console.log('Dentro del IIFE:', secreto);
})(); // Se ejecuta inmediatamente

// Fuera del IIFE:
// console.log(secreto); // ReferenceError: secreto no está definido