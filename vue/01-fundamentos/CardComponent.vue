<script setup>
/**
 * TEMA: Componentes, Props, Emits
 * ENTREVISTA: ¿Cómo comunica un hijo con su padre en Vue?
 *
 * Props: padre → hijo (read-only en el hijo)
 * Emits: hijo → padre (eventos personalizados)
 */

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  tags: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update', 'delete']);

function handleClick() {
  emit('update', props.count + 1);
}
</script>

<template>
  <article class="card">
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <ul>
      <li v-for="tag in tags" :key="tag">{{ tag }}</li>
    </ul>
    <button @click="handleClick">Incrementar</button>
    <button @click="emit('delete')">Eliminar</button>
  </article>
</template>

<style scoped>
.card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
