/**
 * TEMA: DOM, Event Bubbling, Event Capturing
 *
 * Bubbling: evento sube del hijo al padre (default).
 * Capturing: evento baja del padre al hijo.
 * stopPropagation() detiene la propagación.
 */

// DOM Manipulation
const button = document.querySelector('#submit');
const list = document.getElementById('user-list');

button?.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Click en botón');
});

// Crear elementos
const li = document.createElement('li');
li.textContent = 'Nuevo item';
li.dataset.id = '42';
// El signo de interrogación (?) después de "list" es el operador de encadenamiento opcional (Optional Chaining).
// Sirve para que solo se ejecute appendChild si list NO es null ni undefined (es decir, si existía el elemento con id 'user-list' en el DOM).
// Si list es null, simplemente no hace nada y no lanza error.
list?.appendChild(li);

// Event Bubbling (fase por defecto)
document.getElementById('parent')?.addEventListener('click', () => {
  console.log('Parent clicked'); // Se ejecuta después del child
});

document.getElementById('child')?.addEventListener('click', (e) => {
  console.log('Child clicked');
  // e.stopPropagation(); // Evita que suba al parent
});

// Event Capturing (tercer argumento true)
document.getElementById('parent')?.addEventListener(
  'click',
  () => console.log('Parent capturing'),
  true // Capturing phase
);

// Event Delegation: un listener en el padre maneja hijos
list?.addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('Clicked item:', e.target.dataset.id);
  }
});
