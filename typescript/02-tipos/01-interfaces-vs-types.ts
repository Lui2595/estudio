/**
 * TEMA: Interface vs Type Alias
 * ENTREVISTA: ¿Cuándo usar interface y cuándo type?
 *
 * Interface y type alias son dos maneras de definir formas (shapes) y contratos de tipos en TypeScript,
 * pero tienen diferencias clave en flexibilidad y usabilidad.
 *
 * Interface:
 *   - Se usa principalmente para describir la forma de objetos (y clases).
 *   - Permiten ser extendidas (extends) y pueden combinarse/mergerse si se declaran varias veces con el mismo nombre (declaration merging).
 *   - Ideales para APIs orientadas a objetos y librerías.
 *
 * Type alias:
 *   - Más versátiles: puedes describir no solo objetos, sino uniones (A | B), intersecciones (A & B), tuplas ([string, number]), tipos primitivos, tipos mapeados, etc.
 *   - No tienen declaration merging.
 *   - Se usan mucho para composición de tipos, combinaciones complejas y utilidades.
 *
 * 🟢 Regla práctica: descripciones de objetos y clases → interface. Composiciones, tipos funcionales y combinaciones → type.
 *
 * Veamos ejemplos prácticos:
 */

// Interface: ideal para estructuras de objetos y permite declaración múltiple (merging)
interface User {
  id: number;
  name: string;
}

// Al repetir la declaración, se "mergan" las propiedades:
interface User {
  email: string; // Declaration merging: User tiene id, name y email
}

// Extensión: herencia clara y estructurada para modelar jerarquías
interface Admin extends User {
  permissions: string[];
}

// Type alias: perfecto para uniones e intersecciones de varios tipos
type ID = number | string; // Puede aceptar ambos

type Status = 'pending' | 'active' | 'banned'; // Útil para enums string

// Ejemplo de respuesta típica de API usando unión de objetos:
// La <T> en ApiResponse<T> es un parámetro de tipo genérico.
// Permite que ApiResponse sea reutilizable para cualquier tipo de dato.
// Por ejemplo: ApiResponse<string>, ApiResponse<User>, etc.
// Así, puedes usar ApiResponse para indicar que "data" puede ser de cualquier tipo.
// Ejemplo:
//    const respuesta: ApiResponse<number> = { success: true, data: 123 };
//    const error: ApiResponse<number> = { success: false, error: 'Falló' };
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Intersección: combinar propiedades de varios tipos
type Timestamps = { createdAt: Date; updatedAt: Date };
type Post = { id: number; title: string } & Timestamps; // Post tiene id, title, createdAt y updatedAt

// Tuplas y tipos complejos solo posibles con type
type Pair = [string, number]; // Ejemplo de tupla: longitud y tipo predecibles
type EventHandler = (event: MouseEvent) => void; // Alias para funciones

// Resumen: interfaces para estructuras de objetos abiertas y extendibles; types para combinatoria y tipos complejos
export type { Status, ApiResponse, Post, Admin };
