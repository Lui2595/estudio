/**
 * TEMA: Tipado de Hooks
 * useState, useRef, useReducer, custom hooks.
 */

import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

// useState con inferencia: useState(0) → number
// useState con tipo explícito (cuando el inicial es null):
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((r) => r.json())
      .then(setUser);
  }, [userId]);

  return user ? <p>{user.name}</p> : <p>Cargando...</p>;
}

// useRef: DOM vs valor mutable
function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    inputRef.current?.focus();
  });

  return <input ref={inputRef} />;
}

// useReducer tipado
type State = { count: number };
type Action = { type: 'inc' } | { type: 'dec' } | { type: 'set'; value: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    case 'dec':
      return { count: state.count - 1 };
    case 'set':
      return { count: action.value };
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = useCallback(() => dispatch({ type: 'inc' }), []);

  return (
    <div>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

// Custom hook tipado
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export { UserProfile, InputFocus, Counter, useFetch };
