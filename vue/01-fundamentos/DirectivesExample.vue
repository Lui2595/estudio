<script setup>
/**
 * TEMA: Directivas y v-model
 * ENTREVISTA: ¿Qué hace v-model internamente?
 *
 * v-model = :modelValue + @update:modelValue
 * En Vue 3 soporta múltiples v-models y modificadores (.lazy, .number, .trim)
 */

import { ref } from 'vue';

const search = ref('');
const email = ref('');
const agreed = ref(false);
const selected = ref('');

// v-model en componente hijo custom
const rating = ref(3);
</script>

<template>
  <!-- v-model en input = value + @input -->
  <input v-model.trim="search" placeholder="Buscar..." />

  <!-- Modificadores -->
  <input v-model.number.lazy="email" type="email" />

  <!-- Checkbox -->
  <label>
    <input v-model="agreed" type="checkbox" />
    Acepto términos
  </label>

  <!-- v-if vs v-show -->
  <p v-if="agreed">Gracias por aceptar</p>
  <p v-show="search">Buscando: {{ search }}</p>

  <!-- v-for siempre con :key -->
  <select v-model="selected">
    <option v-for="opt in ['php', 'laravel', 'vue']" :key="opt" :value="opt">
      {{ opt }}
    </option>
  </select>

  <!-- v-model custom component -->
  <RatingInput v-model="rating" />
</template>
