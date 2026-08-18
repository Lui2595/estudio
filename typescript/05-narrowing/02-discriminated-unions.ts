/**
 * TEMA: Discriminated Unions (Uniones discriminadas)
 * 
 * Una "discriminated union" (unión discriminada) es un patrón muy importante en TypeScript, 
 * especialmente útil para manejar el estado de componentes en React, la respuesta de peticiones asíncronas 
 * (fetch, API), o la lógica de reducers (useReducer/redux). Consiste en definir un tipo unión entre varios objetos
 * que siempre tienen una propiedad "discriminante" de valor literal (por ejemplo, 'status' o 'type') que nos permite
 * identificar inequívocamente cuál de las variantes estamos usando.
 * 
 * Esto habilita el narrowing automático en los switches y condicionales: al chequear el valor discriminante,
 * TypeScript reduce el tipo al caso concreto, permitiendo acceso seguro al resto de las propiedades.
 */

// Ejemplo típico: estados de una petición asíncrona (loading/success/error)
type LoadingState = { status: 'loading' };                                  // Mientras carga
type SuccessState<T> = { status: 'success'; data: T };                     // Cuando termina bien, trae datos
type ErrorState = { status: 'error'; error: Error };                       // Si ocurre un error

// El tipo AsyncState representa los tres casos
type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

/**
 * renderUser consume un AsyncState y muestra contenido según el estado.
 *
 * - Si está "loading", muestra mensaje de cargando.
 * - Si fue "success", podemos acceder con seguridad a .data (TS lo sabe).
 * - Si es "error", accedemos a .error (TS lo sabe).
 *
 * TypeScript nos asegura que, dentro de cada case, solo existen las propiedades de ese estado.
 */
function renderUser(state: AsyncState<{ name: string }>): string {
  switch (state.status) {
    case 'loading':
      // Aquí state es LoadingState
      return 'Cargando...';
    case 'success':
      // Aquí state es SuccessState<{ name: string }>
      return state.data.name;
    case 'error':
      // Aquí state es ErrorState
      return state.error.message;
    default:
      // (nunca ocurre, pero ayuda a que el compile cheque exhaustividad)
      return '';
  }
}

// Otro ejemplo clásico: acciones para reducers (como en useReducer)
type CounterAction =
  | { type: 'increment' }            // Sumar 1
  | { type: 'decrement' }            // Restar 1
  | { type: 'set'; payload: number}  // Asignar a un valor exacto

/**
 * El reducer de contador usa la acción discriminada por "type":
 * - Si type es "increment", suma uno
 * - Si type es "decrement", resta uno
 * - Si type es "set", usa el payload para fijar el valor
 * 
 * Gracias a que TypeScript detecta la discriminante, solamente deja acceder a .payload cuando corresponde.
 */
function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'set':
      return action.payload; // TS sabe que payload existe solo aquí
    default:
      // Si falta un case, TS puede advertir; normalmente nunca ocurre si están todos.
      return state;
  }
}

export { renderUser, counterReducer };
export type { AsyncState, CounterAction };
