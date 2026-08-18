# Preguntas y Respuestas — React + TypeScript

> Review rápido sin código.

---

**P: ¿Cómo tipar props con children?**
R: Interface con `children: ReactNode`. Extender `ButtonHTMLAttributes` para props HTML nativas + las tuyas.

---

**P: ¿Cómo tipar event handlers?**
R: `ChangeEvent<HTMLInputElement>`, `FormEvent<HTMLFormElement>`, `MouseEvent<HTMLButtonElement>`.

---

**P: ¿Cómo tipar useState con null inicial?**
R: `useState<User | null>(null)`. TS infiere solo null sin anotación explícita.

---

**P: useRef para DOM vs valor mutable?**
R: DOM: `useRef<HTMLInputElement>(null)`. Valor mutable: `useRef<number>(0)` sin null si no es DOM ref.

---

**P: ¿Cómo tipar custom hooks?**
R: Retornar interface explícita o tupla tipada. `function useFetch<T>(url): { data: T | null; loading: boolean }`.

---

**P: ¿Genéricos en componentes?**
R: `function List<T>({ items, renderItem }: ListProps<T>)`. Permite listas tipadas de cualquier entidad.

---

**P: ¿Props con genéricos en TSX?**
R: Sintaxis `<T,>` o constraint en function para evitar conflicto con JSX tags.
