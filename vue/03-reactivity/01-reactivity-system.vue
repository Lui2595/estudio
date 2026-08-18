<script setup>
/**
 * TEMA: Reactividad profunda en Vue 3
 * ENTREVISTA: ¿Cómo funciona la reactividad en Vue 3?
 *
 * Vue 3 usa Proxies (no Object.defineProperty como Vue 2).
 * Rastrea dependencias automáticamente y dispara re-renders selectivos.
 */

import { isReactive, isRef, reactive, ref, shallowRef, toRef, toRefs } from 'vue';

const user = reactive({ name: 'Ana', profile: { bio: 'Dev' } });

// toRefs: desestructurar reactive sin perder reactividad
const { name, profile } = toRefs(user);

// toRef: una propiedad como ref
const bio = toRef(user.profile, 'bio');

// shallowRef: solo el .value es reactivo, no propiedades internas
const cache = shallowRef({ data: [] });
// cache.value.data.push(x) NO dispara re-render
// cache.value = { data: [...] } SÍ dispara re-render

// Pérdida de reactividad al desestructurar reactive directamente:
// const { name } = user; // name NO es reactivo
// Solución: toRefs(user)

// isRef / isReactive para debugging
console.log(isRef(name), isReactive(user));
</script>

<template>
  <p>{{ name }} — {{ bio }}</p>
</template>
