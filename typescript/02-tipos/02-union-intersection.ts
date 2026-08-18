/**
 * TEMA: Union Types e Intersection Types
 * ENTREVISTA: ¿Qué es un discriminated union?
 *
 * Union (|): el valor puede ser uno de varios tipos.
 * Intersection (&): combina propiedades de varios tipos.
 * Discriminated union: campo común (kind/status) para narrowing seguro.
 */

type Result<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function renderResult<T>(result: Result<T>): string {
  switch (result.status) {
    case 'loading':
      return 'Cargando...';
    case 'success':
      return JSON.stringify(result.data); // TS sabe que data existe
    case 'error':
      return result.message;
  }
}

// Intersection: combinar contratos
interface Identifiable {
  id: number;
}

interface Auditable {
  createdBy: string;
}

type Entity = Identifiable & Auditable;

const producto: Entity = { id: 1, createdBy: 'admin' };

// Union de literales
type Theme = 'light' | 'dark';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export { renderResult };
export type { Result, Theme, HttpMethod };
