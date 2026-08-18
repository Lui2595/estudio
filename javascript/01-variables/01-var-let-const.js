/**
 * TEMA: var, let, const
 * ENTREVISTA: ¿Diferencia entre let y var?
 *
// Esto significa:
// - var: tiene alcance de función (function-scoped), se "eleva" (hoisting) al inicio de la función y permite declarar la misma variable más de una vez.
// - let: tiene alcance de bloque (block-scoped), existe una "zona muerta temporal" (TDZ) antes de su declaración y no permite volver a declarar la variable en el mismo bloque.
// - const: también tiene alcance de bloque, no permite reasignar el valor (aunque si es un objeto, se pueden cambiar sus propiedades internas).
 */


ejemploLet();

// Entonces: 
// - var => function-scoped
// - let/const => block-scoped

// var - problemático en loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Imprime 3, 3, 3
}

// let - correcto en loops
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // Imprime 0, 1, 2
}

const PI = 3.14159;
// PI = 3; // TypeError

const user = { name: 'Ana' };
user.name = 'Luis'; // OK: mutar propiedades
// user = {};       // TypeError: reasignación

// No, `let` NO es function-scoped. `let` (y también `const`) son block-scoped:
// Solo existen dentro del bloque donde fueron declarados (if, for, { ... }).
// Ejemplo:

function ejemploLet() {
  if (true) {
    let dentroDelIf = 'solo vive aquí';
    var conVar = 'vive en toda la función';
  }
  // console.log(dentroDelIf); // ReferenceError: fuera del bloque "if"
  console.log(conVar); // 'vive en toda la función' (function-scoped)
}