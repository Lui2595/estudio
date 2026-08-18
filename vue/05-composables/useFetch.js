/**
 * TEMA: Composables (Custom Hooks de Vue)
 * ENTREVISTA: ¿Qué es un composable y cuáles son las reglas?
 *
 * Función use* que encapsula lógica reactiva reutilizable.
 * Reglas: nombre use*, puede usar otros composables, retorna refs/reactive.
 */

import { onUnmounted, ref, watchEffect } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  let abortController = null;

  watchEffect(async () => {
    abortController?.abort();
    abortController = new AbortController();

    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(url, { signal: abortController.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data.value = await res.json();
    } catch (e) {
      if (e.name !== 'AbortError') error.value = e.message;
    } finally {
      loading.value = false;
    }
  });

  onUnmounted(() => abortController?.abort());

  return { data, loading, error };
}

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const value = ref(stored ? JSON.parse(stored) : defaultValue);

  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(value.value));
  });

  return value;
}

// Uso en componente:
// const { data, loading, error } = useFetch('/api/users');
