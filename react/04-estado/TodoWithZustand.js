/**
 * TEMA: Estado Global - Zustand y Redux
 *
 * Zustand es una alternativa más ligera y sencilla a Redux para el manejo de estado global en aplicaciones React.
 * Mientras Redux está basado en reducers y acciones, Zustand utiliza funciones directas y una API minimalista, lo que lo hace ideal 
 * para proyectos pequeños o medianos.
 *
 * ¿Por qué usar un estado global como Zustand o Redux?
 * - Permite compartir información entre muchos componentes distantes sin pasar props.
 * - Centraliza el estado de la app, facilitando la organización, depuración y mantenimiento.
 * - Ideal para casos como: usuarios autenticados, temas, carritos, notificaciones, etc.
 *
 * A continuación verás un ejemplo de cómo lograr funcionalidad similar de TODOs con Zustand,
 * y al final se muestra cómo se vería con Redux de forma básica (reducers y actions).
 */

// ---- ESTADO GLOBAL CON ZUSTAND ----

import { create } from 'zustand';

// Creamos el store Zustand para los TODOs
const useTodoStore = create((set) => ({
  todos: [],            // Lista de tareas
  filter: 'all',        // Filtro actual: 'all', 'active', 'completed'
  loading: false,       // Simula carga para alguna operación (estilo Redux)
  error: null,          // Error global en operaciones

  // Agrega un nuevo TODO
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), text, done: false }
      ],
      error: null,
    })),

  // Alterna el "done" de un TODO por id
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
      error: null,
    })),

  // Cambia el filtro (all, active, completed)
  setFilter: (filter) =>
    set({ filter, error: null }),

  // Simula una operación asíncrona (ejemplo: fetch/update)
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      // Simulación: aquí iría fetch real
      await new Promise((res) => setTimeout(res, 500));
      // set({ todos: dataDelServidor, loading: false });
    } catch (e) {
      set({ error: 'Error al cargar TODOs', loading: false });
    }
    set({ loading: false });
  },

  // Getter: Devuelve los todo visibles según filtro actual
  get filteredTodos() {
    const { todos, filter } = useTodoStore.getState();
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  },
}));

// # USO en componente React:
// const todos = useTodoStore((state) => state.filteredTodos);
// const addTodo = useTodoStore((state) => state.addTodo);
// const loading = useTodoStore((state) => state.loading);
// const error = useTodoStore((state) => state.error);

// ---- ESTADO GLOBAL CON REDUX (ESQUEMA BÁSICO) ----

// import { createStore } from 'redux';

// Estado inicial
// const initialState = {
//   todos: [],
//   filter: 'all',
//   loading: false,
//   error: null,
// };

// Reducer de todos
// function todoReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return {
//         ...state,
//         todos: [...state.todos, { id: Date.now(), text: action.text, done: false }],
//         error: null,
//       };
//     case 'TOGGLE_TODO':
//       return {
//         ...state,
//         todos: state.todos.map((t) =>
//           t.id === action.id ? { ...t, done: !t.done } : t
//         ),
//         error: null,
//       };
//     case 'SET_FILTER':
//       return { ...state, filter: action.filter, error: null };
//     case 'SET_LOADING':
//       return { ...state, loading: action.loading };
//     case 'SET_ERROR':
//       return { ...state, error: action.error };
//     default:
//       return state;
//   }
// }

// Crear el store
// const store = createStore(todoReducer);

// # Uso en componente React-Redux:
// import { useSelector, useDispatch } from 'react-redux';
// const todos = useSelector(state => state.todos);
// const dispatch = useDispatch();
// dispatch({ type: 'ADD_TODO', text: 'Aprender Redux' });

export default useTodoStore;
