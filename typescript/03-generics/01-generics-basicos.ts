/**
 * TEMA: Generics
 * ENTREVISTA: ¿Para qué sirven los genéricos?
 *
 * Reutilizar lógica manteniendo type safety.
 * Evitan duplicar funciones/clases para cada tipo.
 */

function first<T>(items: T[]): T | undefined {
  return items[0];
}

const num = first([1, 2, 3]);       // number | undefined
const str = first(['a', 'b']);      // string | undefined

// Múltiples type parameters
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// Genéricos en interfaces
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T, B>(url: string, body: B): Promise<T>;
}

// Default type parameters
interface Paginated<T, M = { page: number; total: number }> {
  data: T[];
  meta: M;
}

const users: Paginated<{ id: number; name: string }> = {
  data: [{ id: 1, name: 'Ana' }],
  meta: { page: 1, total: 10 },
};

export { first, pair };
export type { Repository, ApiClient, Paginated };
