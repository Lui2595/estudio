<script setup>
/**
 * TEMA: watch vs watchEffect
 * ENTREVISTA: ¿Cuándo usar watch y cuándo watchEffect?
 *
 * watch: observa fuente(s) específica(s), acceso al valor anterior
 * watchEffect: ejecuta inmediatamente, auto-rastrea dependencias usadas
 */

import { ref, watch, watchEffect } from 'vue';

const userId = ref(1);
const user = ref(null);
const search = ref('');

// watch: reacciona a cambio específico
watch(userId, async (newId, oldId) => {
  console.log(`Cambió de ${oldId} a ${newId}`);
  user.value = await fetchUser(newId);
}, { immediate: true }); // immediate = ejecutar al montar

// watch múltiples fuentes
watch([userId, search], ([id, query]) => {
  console.log('User o search cambió', id, query);
});

// watchEffect: auto-track dependencias
watchEffect(async () => {
  if (!userId.value) return;
  // Cualquier ref usado aquí se rastrea automáticamente
  document.title = `Usuario ${userId.value}`;
});

// Cleanup en watchEffect
watchEffect((onCleanup) => {
  const timer = setInterval(() => console.log('tick'), 1000);
  onCleanup(() => clearInterval(timer));
});

async function fetchUser(id) {
  return { id, name: 'Ana' };
}
</script>

<template>
  <div>
    <button @click="userId++">Siguiente usuario</button>
    <p v-if="user">{{ user.name }}</p>
  </div>
</template>
