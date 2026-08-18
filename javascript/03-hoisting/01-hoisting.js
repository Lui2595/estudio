/**
/**
 * TEMA: Hoisting
 *
 * DEFINICIÓN: "Hoisting" es un comportamiento de JavaScript por el cual las declaraciones de variables (var, let, const) y funciones se mueven ("elevan") al inicio de su contexto de ejecución (scope), antes de que el código sea ejecutado. 
 * Sin embargo, solo las declaraciones se elevan, no las asignaciones. Las variables declaradas con var se inicializan como undefined, mientras que let y const quedan en una "zona muerta temporal" (TDZ) hasta su declaración. Las function declarations se hoistean completamente (pueden ser llamadas antes de su definición), pero las function expressions NO.
 
 * ENTREVISTA: ¿Qué imprime console.log(a) antes de var a = 5?
 *
 * var y function declarations se "elevan" al inicio del scope.
 * let/const están en Temporal Dead Zone hasta su declaración.
 */

console.log(a); // undefined (no ReferenceError con var)
var a = 5;

// Equivalente interpretado:
// var a;
// console.log(a); // undefined
// a = 5;

// Con let:
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
// let b = 5;

// Function declarations se hoistean completas
saludar(); // "Hola!" - funciona

function saludar() {
  console.log('Hola!');
}

// Function expressions NO se hoistean
// despedir(); // TypeError
const despedir = function () {
  console.log('Adiós');
};
