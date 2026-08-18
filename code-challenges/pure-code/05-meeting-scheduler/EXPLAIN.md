# 05 Meeting Scheduler — Caso de estudio (flujo)

## Idea en una frase

Tres herramientas de intervalos half-open `[start, end)`: fusionar busy, sacar huecos libres, y contar salas mínimas con barrido de eventos.

---

## 1) `mergeBusy`

```
1. Ordenar por start (tie → end)
2. merged = [primero]
3. Para cada siguiente [s,e]:
     si s <= last.end  → last.end = max(last.end, e)   // overlap o touching
     si no             → push [s,e]
```

`s <= last.end` incluye touching `[1,2]+[2,3] → [1,3]`.

### Walkthrough

`[0,60],[50,120],[200,300]`
→ sort igual → merge 0-60 con 50-120 → `[0,120]` → 200 no toca → `[[0,120],[200,300]]`

---

## 2) `freeSlots`

```
1. busy = mergeBusy(busyIntervals)
2. cursor = dayStart
3. Para cada [s,e] en busy:
     gap = [cursor, s)
     si length(gap) >= slotMinutes → push gap
     cursor = max(cursor, e)
4. gap final [cursor, dayEnd) igual
```

### Walkthrough omit short

busy `[0,50],[60,100]`, day 0-100, slot 15  
gap `[50,60)` length 10 < 15 → omit  
final gap vacío → `[]`

---

## 3) `minRooms` (sweep line)

```
1. Eventos: (start, +1), (end, -1)
2. Sort por tiempo; si empate, end (-1) ANTES que start (+1)
   → half-open: [0,10) y [10,20) no se solapan → 1 sala
3. Recorre: cur += delta; max = max(max, cur)
```

### Walkthrough

`[0,30],[5,10],[15,20]`
timeline: + at 0,5,15 ; - at 10,20,30  
pico concurrente = 2

---

## Frase de entrevista

> "I sort and merge intervals in linear pass after O(n log n) sort. Free slots are gaps between merged busy blocks. Min rooms is a sweep line counting max concurrent starts, processing ends first at the same timestamp for half-open intervals."

## Archivos

```bash
npx tsx solution.optimized.ts starter/cases.json
php solution.optimized.php starter/cases.json
```
