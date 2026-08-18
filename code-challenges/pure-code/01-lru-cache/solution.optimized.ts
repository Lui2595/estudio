/**
 * LRU Cache — versión optimizada
 *
 * ---------------------------------------------------------------------------
 * QUÉ FALLABA EN solution.ts (tu versión)
 * ---------------------------------------------------------------------------
 * 1) CORRECTITUD — put no actualiza claves existentes
 *    Siempre hace push(). En "update_existing": put(1,9) con capacity 2
 *    debería reemplazar el valor de 1 y refrescar recencia, NO añadir un
 *    tercer elemento ni desalojar a ciegas.
 *
 * 2) CORRECTITUD — put a capacidad llena siempre llama freeOldest()
 *    Aunque la key ya exista. Actualizar no debe evictar.
 *
 * 3) RENDIMIENTO — get/put hacen findIndex O(n) + sort O(n log n)
 *    El objetivo del challenge es O(1) amortizado por operación.
 *    Con 50k ops, sort en cada put/get se nota.
 *
 * 4) TIPADO — value: any (rompe la convención strict del challenge)
 *
 * 5) Detalle menor — get miss: return index (-1) funciona de casualidad;
 *    es más claro return -1 explícito.
 *
 * ---------------------------------------------------------------------------
 * POR QUÉ ESTA VERSIÓN ES MEJOR
 * ---------------------------------------------------------------------------
 * Map en JS/TS preserva orden de inserción:
 *   - Primer key = least recently used (LRU)
 *   - Último key = most recently used (MRU)
 * Para “tocar” una key: delete + set → queda al final (MRU) en O(1).
 * Evict: borrar map.keys().next().value (el primero) en O(1).
 *
 * Complejidad: get/put → O(1) amortizado | espacio → O(capacity)
 *
 * Alternativa “de entrevista clásica”: HashMap + Doubly Linked List
 * (misma complejidad; más código). Map ordenado es el idiomático en TS.
 * ---------------------------------------------------------------------------
 */

import fs from "node:fs";

class LRUCache {
  private readonly capacity: number;
  private readonly map = new Map<number, number>();

  constructor(capacity: number) {
    if (capacity < 1) {
      throw new Error("capacity must be >= 1");
    }
    this.capacity = capacity;
  }

  get(key: number): number {
    if (!this.map.has(key)) {
      return -1;
    }
    const value = this.map.get(key)!;
    // Refresh recency: move to MRU (end of Map insertion order)
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      // Update existing: remove old position, re-insert as MRU
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      // Evict LRU = first key in insertion order
      const oldestKey = this.map.keys().next().value as number;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

// --- Runner (valida contra cases.json) -------------------------------------

type Op = [string, ...number[]];

interface Case {
  name: string;
  ops: Op[];
  expected: number[];
}

function runCase(c: Case): { name: string; passed: boolean; got: number[]; expected: number[] } {
  let cache: LRUCache | undefined;
  const got: number[] = [];

  for (const op of c.ops) {
    const [name, a, b] = op;
    switch (name) {
      case "LRUCache":
        cache = new LRUCache(a);
        break;
      case "put":
        cache!.put(a, b);
        break;
      case "get":
        got.push(cache!.get(a));
        break;
      default:
        throw new Error(`Unknown op: ${name}`);
    }
  }

  const passed =
    got.length === c.expected.length && got.every((v, i) => v === c.expected[i]);

  return { name: c.name, passed, got, expected: c.expected };
}

function main(): void {
  const path = process.argv[2] ?? "starter/cases.json";
  const raw = JSON.parse(fs.readFileSync(path, "utf8")) as { cases: Case[] };
  const results = raw.cases.map(runCase);
  const passed = results.every((r) => r.passed);

  console.log(JSON.stringify({ passed, results }, null, 2));
  process.exit(passed ? 0 : 1);
}

main();
