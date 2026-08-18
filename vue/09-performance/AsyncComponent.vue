<script setup>
/**
 * TEMA: Performance — v-memo, defineAsyncComponent, KeepAlive
 */

import { defineAsyncComponent, shallowRef } from 'vue';

// Lazy load con loading/error states
const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: { template: '<p>Cargando gráfico...</p>' },
  delay: 200,
  timeout: 10000,
});

const items = shallowRef([
  { id: 1, name: 'Ana', active: true },
  { id: 2, name: 'Luis', active: false },
]);

// shallowRef: no deep reactivity — útil para listas grandes que reemplazas enteras
</script>

<template>
  <!-- v-memo: skip re-render si deps no cambiaron (Vue 3.2+) -->
  <div
    v-for="item in items"
    :key="item.id"
    v-memo="[item.id === selectedId]"
  >
    {{ item.name }}
  </div>

  <!-- KeepAlive: preserva estado de componentes al cambiar tabs -->
  <KeepAlive :include="['UserList', 'Settings']">
    <component :is="currentTab" />
  </KeepAlive>

  <Suspense>
    <HeavyChart />
    <template #fallback>Cargando...</template>
  </Suspense>
</template>
