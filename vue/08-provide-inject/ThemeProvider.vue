<script setup>
/**
 * TEMA: Provide / Inject
 * ENTREVISTA: ¿Alternativa a prop drilling en Vue?
 *
 * provide/inject: ancestro provee, descendiente consume sin intermediarios.
 * Similar a Context en React. Usar con símbolos para keys tipadas.
 */

import { inject, provide, readonly, ref } from 'vue';

const ThemeKey = Symbol('theme');

// Componente ancestro (App.vue)
const theme = ref('light');
provide(ThemeKey, readonly(theme)); // readonly evita mutación desde hijos
provide('updateTheme', (t) => { theme.value = t; });

// En componente descendiente:
// const theme = inject(ThemeKey);
// const updateTheme = inject('updateTheme');
</script>

<template>
  <slot />
</template>
