# Preguntas y Respuestas — TypeScript (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 12 |

---

## 01-fundamentos

**P: ¿Cuándo anotar tipos explícitamente?**
R: Cuando inferencia es ambigua (array vacío), en APIs públicas, o cuando quieres contrato explícito. Si inferencia es clara, déjala.

---

**P: ¿any vs unknown?**
R: `any` desactiva el chequeo — evitar. `unknown` es tipo seguro para valores desconocidos; obliga a validar antes de usar.

---

**P: ¿Qué es never?**
R: Valores que nunca ocurren. Funciones que siempre lanzan, loops infinitos, o verificar exhaustividad en switch.

---

**P: ¿Qué es void?**
R: Retorno de funciones que no retornan valor útil. Diferente de undefined en strict mode.

---

**P: ¿Tupla vs Array?**
R: Tupla: longitud y tipos fijos `[string, number]`. Array: longitud variable del mismo tipo `number[]`.

---

**P: ¿Por qué TypeScript sobre JavaScript en proyectos React Senior?**
R: Detecta errores en compile, autocompletado, refactoring seguro, contratos en props/APIs, documentación viva del código.

---

## 02-tipos

**P: interface vs type alias?**
R: Interface: objetos, clases, declaration merging, extends claro. Type: uniones, intersecciones, tuplas, tipos primitivos mapeados.

---

**P: ¿Qué es discriminated union?**
R: Union con campo común (`status`, `kind`) para narrowing seguro en switch. Patrón esencial en React state y API responses.

---

**P: ¿Optional (`?`) vs undefined explícito?**
R: Con `exactOptionalPropertyTypes`, TS distingue propiedad ausente vs `undefined` explícito. Relevante en APIs estrictas.

---

**P: ¿Por qué evitar enums en TS moderno?**
R: Generan código JS en runtime, pueden confundir. Preferir `as const` objects + union type derivado.

---

**P: ¿Qué es intersección (`A & B`)?**
R: Combina propiedades de ambos tipos. El valor debe cumplir ambos contratos simultáneamente.

---

**P: ¿readonly en interfaces?**
R: Propiedades no reasignables después de crear el objeto. Shallow: no protege objetos anidados sin Readonly profundo.

---

## 03-generics

**P: ¿Para qué sirven los genéricos?**
R: Reutilizar lógica manteniendo type safety. Una función/clase que funciona con múltiples tipos sin perder información del tipo.

---

**P: ¿Qué hace `extends` en genéricos?**
R: Restringe T a tipos que cumplan una forma mínima. `T extends HasId` garantiza que T tiene `id`.

---

**P: ¿Qué es `keyof T`?**
R: Union de todas las keys de T como strings literales. Base de tipos seguros para acceder propiedades dinámicamente.

---

**P: ¿Genéricos en React?**
R: `List<T>`, `useState<User>()`, `useFetch<T>()`. Permiten componentes y hooks reutilizables con tipos precisos.

---

**P: ¿Default type parameters?**
R: `Paginated<T, M = DefaultMeta>` — M es opcional y usa default si no se especifica.

---

**P: ¿Generic constraint vs any?**
R: Constraint mantiene relación de tipos. `any` pierde toda información. Siempre preferir constraint.

---

## 04-utility-types

**P: ¿Qué hace Partial<T>?**
R: Todas las propiedades de T opcionales. Ideal para PATCH/update requests.

---

**P: ¿Pick vs Omit?**
R: Pick: selecciona propiedades específicas. Omit: excluye propiedades. `Omit<User, 'password'>` para DTOs públicos.

---

**P: ¿Qué hace Record<K, V>?**
R: Objeto con keys de tipo K y values de tipo V. Mapas tipados: `Record<'admin'|'user', string[]>`.

---

**P: ¿Qué es mapped type?**
R: Transforma cada propiedad de un tipo. `{ [K in keyof T]?: T[K] }` construye Partial manualmente.

---

**P: ¿Qué es conditional type?**
R: `T extends U ? X : Y`. Tipos que dependen de condiciones. Base de utility types avanzados y infer.

---

**P: ¿Extract vs Exclude?**
R: Extract: extrae de union los que extienden U. Exclude: elimina de union los que extienden U.

---

**P: ¿ReturnType y Parameters?**
R: Extraen tipo de retorno y parámetros de una función. Útiles para inferir tipos de librerías externas.

---

## 05-narrowing

**P: ¿Qué es narrowing?**
R: Reducir un union type a uno más específico mediante checks. TS infiere el tipo dentro de cada rama.

---

**P: ¿Qué es type guard?**
R: Función que retorna `value is Type`. `if (isFish(pet))` → TS sabe que pet es Fish dentro del if.

---

**P: typeof vs instanceof vs in?**
R: typeof: primitivos. instanceof: clases/constructors. in: verificar propiedad en objeto.

---

**P: ¿Discriminated union en switch?**
R: Switch sobre campo literal (`status`). Cada case narrowa automáticamente. `default` con `never` verifica exhaustividad.

---

**P: ¿asserts value is T?**
R: Assertion function que lanza si falla. Después de llamarla, TS trata el valor como T.

---

**P: ¿Por qué narrowing importa en React?**
R: State con union `{ loading } | { data } | { error }` requiere narrowing para renderizar UI correcta sin runtime errors.

---

## 06-funciones

**P: ¿Function overloads?**
R: Múltiples firmas, una implementación. TS elige la firma correcta según argumentos. Útil para APIs con comportamiento distinto por tipo de input.

---

**P: ¿Tipo de retorno explícito vs inferido?**
R: Inferido en funciones simples. Explícito en funciones públicas, callbacks complejos, o cuando inferencia es demasiado amplia.

---

**P: void vs undefined en callbacks?**
R: Callback que retorna void acepta funciones que retornan cualquier cosa (ignora retorno). Útil en event handlers.

---

**P: ¿Genéricos en funciones?**
R: `function identity<T>(x: T): T`. Preserva el tipo exacto del argumento en el retorno.

---

**P: ¿Optional y default parameters?**
R: `function greet(name: string, greeting = 'Hola')`. Default hace el parámetro opcional en la práctica.

---

## 07-clases

**P: Modificadores public, private, protected?**
R: public: accesible everywhere. private: solo dentro de la clase. protected: clase y subclases.

---

**P: implements vs extends?**
R: implements: cumple contrato de interface (sin herencia). extends: hereda de clase padre.

---

**P: ¿Parameter properties?**
R: Atajo TS: declarar y asignar en constructor `constructor(public name: string)`. Genera propiedad automáticamente.

---

**P: ¿Clases vs interfaces en TS?**
R: Interfaces solo existen en compile time. Clases generan JS en runtime. Interfaces para contratos; clases cuando necesitas instancias con comportamiento.

---

**P: abstract class vs interface?**
R: Abstract puede tener implementación y estado. Interface solo contrato. Abstract para jerarquía con lógica compartida.

---

**P: readonly en clases?**
R: Propiedad asignable solo en constructor o declaración. No reasignable después.

---

## 08-modulos

**P: import type vs import?**
R: `import type` solo importa tipos, eliminado en compile. Con `verbatimModuleSyntax`, obligatorio para imports solo de tipos.

---

**P: ¿export type?**
R: Exporta solo el tipo sin generar JS. Evita imports circulares y código innecesario en bundle.

---

**P: ¿Barrel files (index.ts)?**
R: Re-exportan módulos de una carpeta. Conveniente pero puede afectar tree-shaking si mal usados.

---

**P: CommonJS interop?**
R: `esModuleInterop` y `allowSyntheticDefaultImports` facilitan importar módulos CJS como default imports.

---

**P: ¿isolatedModules?**
R: Cada archivo transpilable independientemente. Requerido por Babel/esbuild. Prohíbe const enums y algunos patterns.

---

## 09-config

**P: ¿Qué hace strict: true?**
R: Activa todas las opciones estrictas: noImplicitAny, strictNullChecks, strictFunctionTypes, etc. Base mínima en proyectos serios.

---

**P: ¿Qué es strictNullChecks?**
R: null y undefined no asignables a otros tipos sin narrowing. Principal ventaja de TS sobre JS. Obliga a manejar casos null.

---

**P: ¿noUncheckedIndexedAccess?**
R: arr[i] es T | undefined, no T. Más seguro, evita accesos fuera de bounds silenciosos.

---

**P: ¿Desactivar strictNullChecks: qué pasa?**
R: string acepta null/undefined. Pierdes la protección principal de TS. No recomendado.

---

**P: skipLibCheck vs noEmit?**
R: skipLibCheck: no type-check archivos .d.ts de node_modules (más rápido). noEmit: solo verifica tipos sin generar JS.

---

**P: paths en tsconfig?**
R: Alias de imports: `@/*` → `src/*`. Requiere configuración equivalente en bundler (Vite, webpack).

---

## 10-assertions

**P: as vs satisfies: ¿diferencia?**
R: `as` fuerza el tipo (puede mentir, pierde inferencia literal). `satisfies` valida la forma SIN perder inferencia de literales.

---

**P: ¿Cuándo usar as?**
R: Cuando sabes más que TS (DOM APIs, migraciones graduales). Con cuidado; preferir type guards.

---

**P: ¿Qué es as const?**
R: Hace valores readonly y los infiere como literales. `{ a: 1 } as const` → `{ readonly a: 1 }`, no `{ a: number }`.

---

**P: Non-null assertion (!)?**
R: Le dices a TS "confía, no es null". `element!.click()`. Peligroso si estás equivocado.

---

**P: ¿Por qué satisfies es preferido para configs?**
R: Valida estructura completa y mantiene tipos literales para autocompletado. Mejor DX que `as Config`.

---

## 11-react

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

---

## 12-avanzado

**P: ¿Para qué sirven archivos .d.ts?**
R: Declarar tipos para JS sin tipos, extender globals (Window, ImportMeta), o ambient declarations.

---

**P: ¿Qué es index signature?**
R: `[key: string]: T` permite keys dinámicas con tipo de valor consistente. Útil para mapas y traducciones.

---

**P: keyof typeof pattern?**
R: `typeof obj` obtiene tipo del objeto. `keyof` extrae keys como union literal. Base de configs type-safe.

---

**P: ¿Template literal types?**
R: Strings como tipos: `` `on${Capitalize<Event>}` `` → `'onClick' | 'onFocus'`. Metaprogramación de strings.

---

**P: ¿infer en conditional types?**
R: Extrae tipo dentro de conditional: `T extends (...args: any) => infer R ? R : never` obtiene return type.

---

**P: ¿Declaration merging?**
R: Interfaces con mismo nombre se fusionan. Útil para extender tipos de librerías. Solo interfaces, no types.

---
