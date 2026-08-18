/**
 * TEMA: Módulos ES en TypeScript
 * import/export, re-exports, import type.
 */

// Named export
export const API_URL = 'https://api.example.com';

export function fetchJson<T>(url: string): Promise<T> {
  return fetch(url).then((r) => r.json());
}

// Default export
export default class HttpClient {
  constructor(private baseUrl: string) {}

  get<T>(path: string): Promise<T> {
    return fetchJson<T>(`${this.baseUrl}${path}`);
  }
}

// Type-only exports (no generan JS en runtime con verbatimModuleSyntax)
export type { User } from './types';

// import type { User } from './types'; // Solo tipos, se elimina al compilar
