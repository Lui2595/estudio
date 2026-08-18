# Preguntas y Respuestas — Lifecycle Hooks

> Review rápido sin código.

---

**P: Hooks más usados en Composition API?**
R: onMounted (fetch inicial, listeners), onUnmounted (cleanup), onBeforeUnmount (cleanup antes de desmontar).

---

**P: onMounted vs watchEffect immediate?**
R: onMounted: una vez al montar. watchEffect immediate: al montar Y cada vez que deps cambian.

---

**P: ¿Dónde hacer cleanup?**
R: onUnmounted o return cleanup en watchEffect. Remover listeners, abort fetch, clearInterval.

---

**P: Equivalencia Options API?**
R: created/mounted/updated/destroyed. Composition: onBeforeMount, onMounted, onUpdated, onUnmounted, etc.

---

**P: ¿onUpdated para qué?**
R: Después de cada re-render. Usar con cuidado (puede causar loops). Preferir watch para efectos específicos.

---

**P: ¿Fetch en created o mounted?**
R: mounted/onMounted en cliente. En Nuxt: useFetch/useAsyncData en setup (SSR-safe).
