# Preguntas y Respuestas — JavaScript (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 11 |

---

## 01-variables

**P: ¿Diferencia entre let y var?**
R: `var` es function-scoped y permite redeclaración; hace hoisting como undefined. `let` es block-scoped, no redeclarable, temporal dead zone hasta su línea.

---

**P: ¿Qué es const?**
R: Block-scoped, no reasignable. Pero objetos/arrays const SÍ pueden mutar propiedades internas.

---

**P: ¿Por qué var falla en loops con setTimeout?**
R: `var` comparte una sola variable `i` para todas las iteraciones. Al ejecutar callbacks, `i` ya vale el valor final. `let` crea binding nuevo por iteración.

---

**P: ¿Cuándo usar const vs let?**
R: `const` por defecto siempre que no reasignes. `let` solo cuando la variable cambia. Nunca `var` en código moderno.

---

**P: ¿const garantiza inmutabilidad?**
R: No. Garantiza que no reasignes la referencia. `const obj = {}; obj.name = 'x'` es válido. Inmutabilidad real requiere `Object.freeze()` o librerías.

---

## 02-scope

**P: ¿Qué es Global Scope?**
R: Variables accesibles en todo el programa. En browser: `window`. Evitar contaminar global.

---

**P: ¿Qué es Function Scope?**
R: Variables declaradas con `var` o parámetros de función solo existen dentro de esa función.

---

**P: ¿Qué es Block Scope?**
R: Variables `let`/`const` dentro de `{}` (if, for, while) solo existen en ese bloque.

---

**P: ¿Qué es Lexical Scope?**
R: Las funciones internas acceden a variables del scope donde fueron DEFINIDAS, no donde se ejecutan. Base de closures.

---

**P: ¿Diferencia scope vs contexto (`this`)?**
R: Scope: qué variables están disponibles (lexical). Contexto: valor de `this` (depende de cómo se llama la función).

---

**P: ¿IIFE para qué servía?**
R: Immediately Invoked Function Expression: crear scope privado antes de ES modules. Hoy menos necesario con modules y block scope.

---

## 03-hoisting

**P: ¿Qué es hoisting?**
R: JS "eleva" declaraciones al inicio del scope antes de ejecutar. Comportamiento diferente según var, let, const y functions.

---

**P: `console.log(a); var a = 5` — ¿qué imprime?**
R: `undefined`. `var a` se hoistea; la asignación no. Equivalente a declarar `a` arriba sin valor.

---

**P: ¿let y const también hacen hoisting?**
R: Sí, pero están en Temporal Dead Zone hasta su línea. Acceder antes → ReferenceError, no undefined.

---

**P: ¿Function declaration vs expression en hoisting?**
R: Declarations se hoistean completas (puedes llamarlas antes). Expressions no (quedan undefined hasta la asignación).

---

**P: ¿Por qué importa en entrevista?**
R: Explica bugs de orden de código, por qué usar let/const, y diferencia con function declarations.

---

## 04-closures

**P: ¿Qué es un closure?**
R: Función que recuerda variables de su scope léxico aunque el scope padre ya terminó de ejecutarse.

---

**P: ¿Para qué sirven los closures?**
R: Datos privados, factories, callbacks, event handlers, módulos antes de ES modules, mantener estado entre llamadas.

---

**P: Explica el clásico loop + setTimeout.**
R: Con `var`, todos los callbacks comparten la misma `i`. Con `let`, cada iteración tiene su propio binding. Solución alternativa: IIFE o closures explícitos.

---

**P: ¿Closure causa memory leaks?**
R: Puede retener referencias a variables grandes innecesariamente. Liberar listeners y referencias cuando ya no se necesitan.

---

**P: ¿Closure en React?**
R: Event handlers capturan state/props del render. Causa bugs con stale closures si no incluyes dependencias en useEffect/useCallback.

---

**P: ¿Diferencia closure vs scope?**
R: Scope es la regla de visibilidad. Closure es el mecanismo que mantiene acceso a ese scope después de que "debería" haber muerto.

---

## 05-this

**P: ¿Qué es `this` en JavaScript?**
R: Referencia al contexto de ejecución. Depende de CÓMO se llama la función, no dónde se define.

---

**P: ¿Cómo cambia `this` en Arrow Functions?**
R: Arrow functions NO tienen propio `this`. Heredan `this` del scope padre (lexical). No usar arrows como métodos de objeto si necesitas `this` del objeto.

---

**P: `this` en método de objeto vs callback?**
R: Método: `this` = objeto. Callback (setTimeout, addEventListener con function): `this` = window/global o undefined en strict mode.

---

**P: ¿Para qué sirven call, apply, bind?**
R: Cambiar `this` explícitamente. `call/apply` ejecutan inmediatamente. `bind` retorna nueva función con `this` fijo.

---

**P: ¿this en clases ES6?**
R: Métodos de clase usan `this` de la instancia. Bind en constructor si pasas método como callback.

---

**P: ¿this en React class components?**
R: Bind manual en constructor o arrow methods. En functional components no existe `this`; usas hooks.

---

## 06-funciones

**P: ¿Qué es Higher Order Function?**
R: Función que recibe o retorna otra función. Ej: `map`, `filter`, middleware Express, decorators.

---

**P: ¿Qué es un callback?**
R: Función pasada como argumento para ejecutarse después. Base de async antes de Promises y en event-driven code.

---

**P: ¿Ventajas de arrow functions?**
R: Sintaxis corta, lexical `this`, retorno implícito. Ideales para callbacks cortos.

---

**P: ¿Cuándo NO usar arrow function?**
R: Métodos de objeto que necesitan `this` dinámico. Constructores (no tienen `prototype`). Cuando necesitas `arguments` object.

---

**P: Callback hell: ¿cómo se solucionó?**
R: Promises encadenadas, async/await, y modularizar funciones intermedias.

---

**P: ¿Pure function vs impure?**
R: Pure: mismo input → mismo output, sin efectos secundarios. Facilita testing y predictibilidad. Impure: modifica estado externo o depende de él.

---

## 07-arrays

**P: ¿Qué hace map?**
R: Transforma cada elemento y retorna nuevo array de la misma longitud. No muta el original.

---

**P: ¿Qué hace filter?**
R: Retorna nuevo array solo con elementos que pasan la condición.

---

**P: ¿Qué hace reduce?**
R: Acumula a un solo valor (número, objeto, array). Requiere valor inicial para evitar bugs con arrays vacíos.

---

**P: find vs filter?**
R: `find` retorna el PRIMER elemento que cumple (o undefined). `filter` retorna array con TODOS los que cumplen.

---

**P: some vs every?**
R: `some`: ¿alguno cumple? (OR). `every`: ¿todos cumplen? (AND). Retornan boolean.

---

**P: ¿map/filter vs forEach?**
R: map/filter retornan nuevo valor/array. forEach solo itera (void). forEach no se puede break; for...of sí.

---

**P: ¿Mutar vs inmutabilidad en arrays?**
R: Preferir métodos no mutantes (map, filter, spread) en React/state. push/splice mutan el original.

---

## 08-asincronia

**P: ¿Qué es el Event Loop?**
R: Mecanismo que coordina call stack, microtasks y macrotasks. Permite JS non-blocking con un solo hilo.

---

**P: ¿Orden de ejecución: sync, Promise, setTimeout?**
R: Sync primero. Luego TODAS las microtasks (Promises). Luego UNA macrotask (setTimeout). Repeat.

---

**P: Microtask vs Macrotask?**
R: Microtasks: Promises, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, I/O. Microtasks tienen prioridad.

---

**P: ¿Qué es una Promise?**
R: Objeto que representa valor futuro. Estados: pending → fulfilled o rejected. Encadenable con then/catch/finally.

---

**P: ¿Qué ocurre internamente con await?**
R: Pausa la función async, delega al Event Loop. Código posterior se convierte en microtask (.then). No bloquea el hilo principal.

---

**P: Promise.all vs allSettled vs race?**
R: all: todas deben resolver o falla. allSettled: espera todas sin importar resultado. race: gana la primera en settle.

---

**P: ¿Paralelo vs secuencial con async/await?**
R: Secuencial: await uno tras otro. Paralelo: `Promise.all([fetch1(), fetch2()])`. Secuencial innecesario es más lento.

---

**P: ¿Cómo manejar errores con async/await?**
R: try/catch alrededor del await. O .catch() si usas Promises directamente.

---

## 09-es6

**P: ¿Qué es destructuring?**
R: Extraer valores de objetos/arrays a variables. `const { name } = user`, `const [first, ...rest] = arr`.

---

**P: ¿Qué hace spread (`...`)?**
R: Expande iterable en elementos individuales. Copiar arrays/objetos, combinar, pasar args a funciones.

---

**P: ¿Qué hace rest (`...`)?**
R: Recolecta elementos restantes. En parámetros: `function sum(...nums)`. En destructuring: `[first, ...rest]`.

---

**P: Spread vs Object.assign?**
R: Spread es más legible y crea copia superficial. Object.assign muta el target si se pasa uno.

---

**P: ¿Shallow vs deep copy?**
R: Shallow: copia primer nivel; objetos anidados siguen siendo referencias. Deep: copia completa (structuredClone, lodash cloneDeep).

---

**P: ¿Destructuring con default values?**
R: `const { phone = 'N/A' } = user` asigna default si la propiedad es undefined.

---

**P: ¿Renombrar en destructuring?**
R: `const { name: userName } = user` extrae `name` en variable `userName`.

---

## 10-modulos

**P: ¿Diferencia export default vs named export?**
R: Default: uno por módulo, import sin llaves. Named: múltiples, import con llaves exactas `{ add, PI }`.

---

**P: ¿Qué es import dinámico?**
R: `import('./module.js')` retorna Promise. Carga lazy en runtime. Base de code splitting en React.

---

**P: CommonJS vs ES Modules?**
R: CommonJS (require/module.exports): Node tradicional, sync. ESM (import/export): estándar JS, static analysis, tree-shaking.

---

**P: ¿Tree-shaking?**
R: Eliminar código no usado en bundle final. Requiere ESM estático. Webpack/Vite lo hacen en build.

---

**P: ¿Re-export?**
R: `export { add } from './math.js'` o `export * from './math.js'`. Barrel files para centralizar exports.

---

**P: ¿Por qué modules resuelven scope global?**
R: Cada módulo tiene scope privado. Variables no contaminan global. Mejor encapsulación que script tags.

---

## 11-browser

**P: ¿Qué es el DOM?**
R: Representación en árbol del HTML que el browser construye. JS puede leer y modificar nodos, atributos y contenido.

---

**P: ¿Qué es Event Bubbling?**
R: Evento sube del elemento hijo al padre hasta document. Fase por defecto en addEventListener.

---

**P: ¿Qué es Event Capturing?**
R: Evento baja del padre al hijo. Tercer parámetro `true` en addEventListener. Menos común.

---

**P: ¿Qué hace stopPropagation()?**
R: Detiene que el evento siga propagándose a padres. No detiene otros listeners en el mismo elemento.

---

**P: ¿Qué es Event Delegation?**
R: Un listener en el padre maneja eventos de hijos via bubbling. Útil para listas dinámicas sin re-bind por item.

---

**P: preventDefault vs stopPropagation?**
R: preventDefault: cancela acción default (submit, link). stopPropagation: evita que suba/baje en el árbol DOM.

---

**P: ¿DOM en React?**
R: React usa Virtual DOM. No manipulas DOM directamente; actualizas state y React reconcilia cambios.

---
