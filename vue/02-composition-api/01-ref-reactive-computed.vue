<script setup>
/**
 * TEMA: Composition API — ref, reactive, computed
 * ENTREVISTA: ¿Diferencia entre ref y reactive?
 *
 * ref: valores primitivos u objetos, acceso con .value en script
 * reactive: solo objetos, acceso directo sin .value
 * Preferir ref para consistencia y reasignación
 */

import { computed, reactive, ref } from 'vue';

const count = ref(0);
const user = ref({ name: 'Ana', role: 'admin' });

const state = reactive({
  items: [],
  filter: '',
});

// computed: valor derivado cacheado (como useMemo en React)
const doubleCount = computed(() => count.value * 2);

const filteredItems = computed(() =>
  state.items.filter((item) =>
    item.name.toLowerCase().includes(state.filter.toLowerCase())
  )
);

// computed con getter/setter
const fullName = computed({
  get: () => `${user.value.name}`,
  set: (val) => {
  user.value.name = val.split(' ')[0];
  },
});

function increment() {
  count.value++; // Siempre .value con ref en script
  state.items.push({ name: 'Nuevo' }); // reactive: sin .value
}
</script>

<template>
  <div>
    <p>{{ count }} × 2 = {{ doubleCount }}</p>
    <button @click="increment">+1</button>
    <input v-model="state.filter" placeholder="Filtrar..." />
    <ul>
      <li v-for="item in filteredItems" :key="item.name">{{ item.name }}</li>
    </ul>
  </div>
</template>
