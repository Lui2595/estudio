<script setup>
/**
 * TEMA: Vue 3 Avanzado — Teleport, Slots, defineModel
 */

// defineModel (Vue 3.4+): simplifica v-model en componentes hijo
const model = defineModel(); // equivale a modelValue + update:modelValue

// Slots: contenido flexible del padre
// Default slot, named slots, scoped slots
</script>

<template>
  <!-- Teleport: renderizar en otro nodo DOM (modals, toasts) -->
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <slot name="header" />
      <slot /> <!-- default -->
      <slot name="footer" :onClose="close" /> <!-- scoped slot -->
    </div>
  </Teleport>

  <input :value="model" @input="model = $event.target.value" />
</template>

<!--
Scoped slots: padre pasa data al slot
<Child v-slot="{ item }">
  {{ item.name }}
</Child>

Renderless components: solo lógica, slot para UI
-->
