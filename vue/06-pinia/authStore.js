/**
 * TEMA: Pinia (State Management)
 * ENTREVISTA: ¿Pinia vs Vuex? ¿Cuándo usar store global?
 *
 * Pinia: oficial Vue 3, sin mutations, TypeScript nativo, DevTools.
 * Vuex: legacy Vue 2, mutations obligatorias, más boilerplate.
 *
 * Usar Pinia cuando: state compartido entre rutas/componentes distantes,
 * datos de sesión, carrito, preferencias. No para server state (usa TanStack Query).
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const token = ref(null);

  // Getters (computed)
  const isAuthenticated = computed(() => !!token.value);
  const userName = computed(() => user.value?.name ?? 'Invitado');

  // Actions
  async function login(email, password) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    user.value = data.user;
    token.value = data.token;
  }

  function logout() {
    user.value = null;
    token.value = null;
  }

  return { user, token, isAuthenticated, userName, login, logout };
});

// Uso:
// const auth = useAuthStore();
// auth.login('a@test.com', 'secret');
// auth.isAuthenticated
