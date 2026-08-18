<script>
/**
 * TEMA: Options API vs Composition API
 * ENTREVISTA: ¿Cuándo usar cada una?
 *
 * Options API: data, methods, computed, watch agrupados por opción.
 *   Familiar, bueno para componentes simples o equipos legacy.
 * Composition API: lógica agrupada por feature, reutilizable via composables.
 *   Estándar en Vue 3 para componentes nuevos y lógica compleja.
 */

export default {
  props: {
    initialCount: { type: Number, default: 0 },
  },

  emits: ['changed'],

  data() {
    return {
      count: this.initialCount,
    };
  },

  computed: {
    double() {
      return this.count * 2;
    },
  },

  watch: {
    count(newVal) {
      this.$emit('changed', newVal);
    },
  },

  mounted() {
    console.log('Componente montado');
  },

  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>

<template>
  <button @click="increment">{{ count }} (×2 = {{ double }})</button>
</template>
