/**
 * TEMA: Type Assertions vs satisfies
 * ENTREVISTA: ¿Diferencia entre as y satisfies? (TS 4.9+)
 *
 * as: le dices al compilador "confía en mí" (puede mentir).
 * satisfies: valida la forma SIN perder inferencia literal.
 */

type Color = 'red' | 'green' | 'blue';

interface Palette {
  primary: Color;
  secondary: Color;
}

// as: fuerza el tipo (pierdes inferencia, puedes equivocarte)
const paletteAs = {
  primary: 'red',
  secondary: 'green',
} as Palette;

// satisfies: valida + mantiene tipos literales
const palette = {
  primary: 'red',
  secondary: 'green',
} satisfies Palette;

// palette.primary es 'red' (literal), no solo Color

// const assertions
const routes = {
  home: '/',
  users: '/users',
  posts: '/posts',
} as const;

type RouteKey = keyof typeof routes;       // 'home' | 'users' | 'posts'
type RoutePath = typeof routes[RouteKey];  // '/' | '/users' | '/posts'

// Non-null assertion (!) — usar con cuidado
function getElement(id: string): HTMLElement {
  return document.getElementById(id)!; // Asume que existe
}

export { palette, routes, getElement };
