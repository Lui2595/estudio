# Preguntas y Respuestas — Assertions (as vs satisfies)

> Review rápido sin código.

---

**P: as vs satisfies: ¿diferencia?**
R: `as` fuerza el tipo (puede mentir, pierde inferencia literal). `satisfies` valida la forma SIN perder inferencia de literales.

---

**P: ¿Cuándo usar as?**
R: Cuando sabes más que TS (DOM APIs, migraciones graduales). Con cuidado; preferir type guards.

---

**P: ¿Qué es as const?**
R: Hace valores readonly y los infiere como literales. `{ a: 1 } as const` → `{ readonly a: 1 }`, no `{ a: number }`.

---

**P: Non-null assertion (!)?**
R: Le dices a TS "confía, no es null". `element!.click()`. Peligroso si estás equivocado.

---

**P: ¿Por qué satisfies es preferido para configs?**
R: Valida estructura completa y mantiene tipos literales para autocompletado. Mejor DX que `as Config`.
