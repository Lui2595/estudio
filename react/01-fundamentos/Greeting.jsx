/**
 * TEMA: JSX, Componentes, Props, State
 *
 * - JSX: Es una extensión de sintaxis para JavaScript que permite escribir código similar a 
 *  HTML dentro de archivos JS/TS. JSX facilita la visualización de la UI y luego se transforma en 
 * llamadas a React.createElement.
 *
 * - Componentes: Son funciones o clases que retornan elementos de UI (usualmente escritos en JSX). 
 * Encapsulan lógica y estructura, permitiendo su reutilización en diferentes partes de la aplicación.
 *
 * - Props: (propiedades) Son datos que se pasan desde un componente padre a uno hijo. Los props permiten 
 * que un mismo componente sea reutilizable y configurable.
 *
 * - State: Es información interna y mutable de un componente. Cuando cambia el state, React vuelve a 
 * renderizar el componente para reflejar el nuevo estado visual.
 */

function Greeting({ name, role = 'user' }) {
  // Este componente recibe 'name' y un 'role' opcional (por defecto "user") como props
  return (
    <div className="greeting">
      {/* Mostramos un saludo personalizado usando el prop 'name' */}
      <h1>Hola, {name}!</h1>
      {/* Mostramos el rol actual usando el prop 'role' */}
      <p>Rol: {role}</p>
    </div>
  );
}

// JSX se compila a invocaciones de React.createElement:
// Por ejemplo, el JSX anterior se traduce aproximadamente a:
// React.createElement('div', { className: 'greeting' },
//   React.createElement('h1', null, 'Hola, ', name, '!'),
//   React.createElement('p', null, 'Rol: ', role)
// );

export default Greeting;
