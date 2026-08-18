# Preguntas y Respuestas — Hooks

> Review rápido sin código. **Prioridad máxima.**

---

**P: ¿Cuándo se ejecuta useEffect?**
R: Después del render, async. Array de deps controla re-ejecución: `[]` solo mount, `[dep]` cuando dep cambia, sin array cada render.

---

**P: useMemo vs useCallback?**  
R: useMemo memoriza un VALOR calculado. useCallback memoriza una FUNCIÓN (referencia estable). useCallback = useMemo(() => fn, deps).

**P: ¿Y React Query?**  
R: Otra capa: **server state** (cache HTTP, retry, invalidate). No reemplaza useMemo/useCallback.  
Ficha: `../../entrevistas/django-react-fastapi-senior/04-react-typescript.md`

---

**P: ¿Para qué useRef?**
R: Referencia DOM, valores mutables que no causan re-render, guardar valor previo, timers/intervals.

---

**P: ¿Qué es stale closure en useEffect?**
R: Effect captura props/state del render donde se creó. Si deps incorrectas, usa valores viejos. Solución: deps correctas o functional updates.

---

**P: ¿Cuándo useContext vs Redux/Zustand?**
R: Context: pocos valores, cambios infrecuentes (theme, auth). Redux/Zustand: state global complejo, muchos consumidores, updates frecuentes.

---

**P: ¿Custom hooks: reglas?**
R: Nombre `use*`, pueden usar otros hooks, extraen lógica reutilizable. No llamar hooks condicionalmente.

---

**P: ¿Cleanup en useEffect?**
R: Return function se ejecuta antes del próximo effect o al desmontar. Esencial para listeners, subscriptions, cancelar fetch.

---

**P: ¿useEffect vs useLayoutEffect?**
R: useLayoutEffect sincrónico después del DOM update, antes de paint. Para mediciones DOM. useEffect async después del paint (mayoría de casos).
