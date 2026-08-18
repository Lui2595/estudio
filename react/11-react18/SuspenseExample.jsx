/**
 * TEMA: React 18+ - Concurrent Rendering, Suspense, Server Components
 *
 * Concurrent Rendering: React puede interrumpir renders para priorizar
 * actualizaciones urgentes (input) sobre las no urgentes (lista).
 *
 * Suspense: muestra fallback mientras carga data o código lazy.
 *
 * Server Components (RSC): se renderizan en el servidor, no envían
 * JS al cliente. No pueden usar hooks ni event handlers.
 */

import { Suspense, lazy, useState, useTransition } from 'react';

const Comments = lazy(() => import('./Comments'));

function SearchPage() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value); // Urgente: actualiza input

    startTransition(() => {
      // No urgente: filtrar lista grande
      setFilter(e.target.value);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Buscando...</span>}

      <Suspense fallback={<div>Cargando comentarios...</div>}>
        <Comments />
      </Suspense>
    </div>
  );
}

// Server Component (Next.js App Router - archivo sin 'use client'):
// async function PostPage({ params }) {
//   const post = await db.posts.find(params.id); // Directo en servidor
//   return <article>{post.content}</article>;
// }

export default SearchPage;
