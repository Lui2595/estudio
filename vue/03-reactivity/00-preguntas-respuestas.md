# Preguntas y Respuestas — Reactividad Vue 3

> Review rápido sin código.

---

**P: ¿Cómo funciona reactividad Vue 3?**
R: Proxies (no defineProperty de Vue 2). Rastrea dependencias en acceso y dispara updates en mutación. Granular y eficiente.

---

**P: ¿Pérdida de reactividad al desestructurar?**
R: Desestructurar reactive pierde reactividad. Solución: toRefs() o acceder como objeto.user.name.

---

**P: ¿Qué es toRefs?**
R: Convierte cada propiedad de reactive en ref independiente. Permite desestructurar manteniendo reactividad.

---

**P: shallowRef vs ref?**
R: shallowRef: solo .value es reactivo, no propiedades internas. Útil para objetos grandes que reemplazas enteros (listas, datos de chart).

---

**P: Vue 2 vs Vue 3 reactividad?**
R: Vue 2: defineProperty, no detecta add/delete de keys, arrays con índice. Vue 3: Proxy, reactividad completa, mejor performance.

---

**P: readonly()?**
R: Hace reactive/readonly no mutables desde consumidor. Útil en provide/inject para state compartido.
