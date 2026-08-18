/**
 * TEMA: this
 * ENTREVISTA: ¿Cómo cambia this en Arrow Functions?
 *
 * this depende de CÓMO se llama la función, no dónde se define.
 * Arrow functions NO tienen su propio this: heredan del scope padre.
 */

const user = {
  name: 'Ana',
  greet() {
    console.log(this.name); // 'Ana' - this = user
  },
  greetArrow: () => {
    console.log(this.name); // undefined - this = window/global
  },
  greetDelayed() {
    setTimeout(function () {
      console.log(this.name); // undefined - this = window
    }, 100);

    setTimeout(() => {
      console.log(this.name); // 'Ana' - hereda this de greetDelayed
    }, 100);
  },
};

// call, apply, bind cambian this explícitamente
function saludar(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const persona = { name: 'Luis' };
// call ejecuta la función saludar usando el objeto persona como contexto (this), pasando 'Hola' como argumento.
saludar.call(persona, 'Hola');    // Hola, Luis

// apply también ejecuta la función saludar con persona como this, pero los argumentos se pasan como un array.
// Si el array contiene más elementos, se pasan todos como argumentos adicionales.
saludar.apply(persona, ['Hello', 'extra', 'argumentos']); // 'Hello, Luis' (solo se usa el primer elemento como saludo, los demás se ignoran en esta función)

// Ejemplo con múltiples argumentos en la función
function saludarCompleto(greeting, edad, ciudad) {
  console.log(`${greeting}, ${this.name}. Edad: ${edad}, Ciudad: ${ciudad}`);
}
saludarCompleto.apply(persona, ['Hola', 30, 'Madrid']); // Hola, Luis. Edad: 30, Ciudad: Madrid

// bind NO ejecuta la función de inmediato, sino que devuelve una nueva función donde this está fijado a persona.
// Cuando luego llamemos bound('Hey'), el this será persona.
const bound = saludar.bind(persona);
bound('Hey');                     // Hey, Luis
