/**
 * TEMA: Declaration Files (.d.ts)
 * Tipar librerías JS sin tipos o extender tipos globales.
 */

// Declarar módulo sin tipos
declare module 'legacy-lib' {
  export function doSomething(value: string): number;
}

// Extender tipos globales
declare global {
  interface Window {
    analytics?: {
      track: (event: string, props?: Record<string, unknown>) => void;
    };
  }
}

// Ambient declaration para variables de entorno (Vite)
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
