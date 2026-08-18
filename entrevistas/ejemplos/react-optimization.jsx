/**
 * ENTREVISTA VOZ: "A React list re-renders too often — how do you optimize?"
 *
 * Responde en voz (inglés):
 * - Memoize row component with React.memo
 * - Stable callback with useCallback
 * - Stable filtered list with useMemo
 * - Unique key from data.id, not index
 */

import { memo, useCallback, useMemo, useState } from 'react';

// Memoized row — only re-renders if item or onSelect reference changes
const TodoRow = memo(function TodoRow({ item, onSelect }) {
  console.log('render row', item.id);
  return (
    <li onClick={() => onSelect(item.id)}>
      {item.title} — {item.done ? '✓' : '○'}
    </li>
  );
});

export function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  // useMemo: recalculate only when todos or filter change
  const filtered = useMemo(() => {
    if (filter === 'done') return todos.filter((t) => t.done);
    if (filter === 'pending') return todos.filter((t) => !t.done);
    return todos;
  }, [todos, filter]);

  // useCallback: stable reference for memoized children
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="pending">Pending</option>
      </select>

      <ul>
        {filtered.map((item) => (
          // key={item.id} — NOT index
          <TodoRow key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>

      {selectedId && <p>Selected: {selectedId}</p>}
    </div>
  );
}

/**
 * ENTREVISTA VOZ: "How do you fetch data in React?"
 *
 * En producción usarías TanStack Query. Patrón básico con useEffect:
 */
export function useTodosBasic() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch('/api/todos', { signal: controller.signal });
        if (!res.ok) throw new Error(res.statusText);
        setData(await res.json());
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    // Cleanup: abort fetch on unmount — evita memory leak y setState en unmounted
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
