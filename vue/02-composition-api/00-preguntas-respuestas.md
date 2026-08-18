# Preguntas y Respuestas — Composition API

> Review rápido sin código. **Prioridad alta.**

---

**P: ref vs reactive?**
R: ref: primitivos u objetos, acceso con .value en script. reactive: solo objetos, acceso directo. Preferir ref por consistencia y reasignación.

---

**P: watch vs watchEffect?**
R: watch: fuente específica, valor anterior, lazy por defecto. watchEffect: ejecuta inmediato, auto-rastrea dependencias usadas en el callback.

---

**P: computed vs methods en template?**
R: computed: cacheado, solo recalcula si deps cambian. methods: ejecuta cada render. Usar computed para valores derivados.

---

**P: Options API vs Composition API?**
R: Options: data/methods/computed por opción, familiar Vue 2. Composition: lógica por feature, composables reutilizables. Composition es estándar Vue 3 nuevo.

---

**P: ¿Equivalente useEffect en Vue?**
R: watch/watchEffect para side effects reactivos. onMounted para mount-only. No hay array deps único; cada hook es explícito.

---

**P: ¿Cuándo Options API todavía?**
R: Componentes muy simples, equipos legacy, migración gradual. Código nuevo: Composition API.
