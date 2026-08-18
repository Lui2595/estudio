# Preguntas y Respuestas — Browser (DOM, Events)

> Review rápido sin código.

---

**P: ¿Qué es el DOM?**
R: Representación en árbol del HTML que el browser construye. JS puede leer y modificar nodos, atributos y contenido.

---

**P: ¿Qué es Event Bubbling?**
R: Evento sube del elemento hijo al padre hasta document. Fase por defecto en addEventListener.

---

**P: ¿Qué es Event Capturing?**
R: Evento baja del padre al hijo. Tercer parámetro `true` en addEventListener. Menos común.

---

**P: ¿Qué hace stopPropagation()?**
R: Detiene que el evento siga propagándose a padres. No detiene otros listeners en el mismo elemento.

---

**P: ¿Qué es Event Delegation?**
R: Un listener en el padre maneja eventos de hijos via bubbling. Útil para listas dinámicas sin re-bind por item.

---

**P: preventDefault vs stopPropagation?**
R: preventDefault: cancela acción default (submit, link). stopPropagation: evita que suba/baje en el árbol DOM.

---

**P: ¿DOM en React?**
R: React usa Virtual DOM. No manipulas DOM directamente; actualizas state y React reconcilia cambios.
