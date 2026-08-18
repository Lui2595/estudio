# Preguntas y Respuestas — Provide / Inject

> Review rápido sin código.

---

**P: ¿Alternativa a prop drilling en Vue?**
R: provide/inject: ancestro provee, descendiente consume sin intermediarios. Similar Context API en React.

---

**P: provide vs Pinia?**
R: provide: scope del subárbol, ligero, sin DevTools store. Pinia: global, persistencia, debugging.

---

**P: ¿Cómo tipar provide/inject?**
R: InjectionKey con Symbol en TypeScript. inject(ThemeKey) retorna tipo correcto.

---

**P: readonly en provide?**
R: Evita que hijos muten state directamente. Mutaciones via funciones proveídas (patrón flux-like).

---

**P: ¿provide reactivo?**
R: Pasar ref o reactive. Hijos ven cambios. Pasar valor primitivo: no reactivo.

---

**P: ¿Cuándo NO usar provide/inject?**
R: Relaciones padre-hijo directas (usa props). State global app-wide (usa Pinia).
