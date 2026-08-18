<script setup>
/**
 * TEMA: Lifecycle Hooks (Composition API)
 * ENTREVISTA: ¿Equivalente de useEffect en Vue?
 *
 * onMounted, onUpdated, onUnmounted son los más usados.
 * No hay array de deps: defines el hook una vez por ciclo de vida.
 */

import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue';

const data = ref(null);

onBeforeMount(() => {
  console.log('Antes de montar en DOM');
});

onMounted(async () => {
  // Equivalente a useEffect(() => {}, []) en React
  data.value = await fetch('/api/config').then((r) => r.json());

  window.addEventListener('resize', handleResize);
});

onBeforeUpdate(() => {
  console.log('Antes de re-render');
});

onUpdated(() => {
  console.log('Después de re-render');
});

onBeforeUnmount(() => {
  // Cleanup antes de desmontar
});

onUnmounted(() => {
  // Equivalente al return de useEffect (cleanup)
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  console.log('resize');
}
</script>

<template>
  <pre>{{ data }}</pre>
</template>
