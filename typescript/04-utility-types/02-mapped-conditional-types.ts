/**
 * TEMA: Mapped Types y Conditional Types
 * Nivel Senior: cómo se construyen utility types internamente.
 */

interface User {
  id: number;
  name: string;
  email: string;
}

// Mapped type: transformar cada propiedad
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Conditional type: T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// infer: extraer tipo dentro de una conditional
type ReturnTypeOf<T> = T extends (...args: unknown[]) => infer R ? R : never;

type Fn = (x: number) => string;
type FnReturn = ReturnTypeOf<Fn>; // string

// Template literal types
type EventName = 'click' | 'focus' | 'blur';
type HandlerName = `on${Capitalize<EventName>}`;
// 'onClick' | 'onFocus' | 'onBlur'

type Route = `/users/${string}` | `/posts/${string}`;

export type { Optional, Nullable, HandlerName, Route };
