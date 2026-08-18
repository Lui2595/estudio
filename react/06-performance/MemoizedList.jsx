/**
 * TEMA: Memoization, React.memo, Lazy Loading, Code Splitting
 *
 * Este ejemplo muestra varias técnicas de optimización de rendimiento en React:
 * 
 * 1. **React.memo**: "Memoiza" (memoriza) un componente funcional, evitando su re-render si las props NO cambiaron 
 *    (usando comparación superficial/shallow de las props). Esto es útil para listas grandes donde los datos
 *    de cada ítem no suelen cambiar frecuentemente.
 *
 * 2. **useMemo**: Memoriza/calcula solo cuando cambian dependencias, en este caso el filtrado de productos.
 *    Así evitamos filtrar en cada render inútilmente si "products" o "category" no cambian.
 *
 * 3. **React.lazy & Suspense**: Permite que componentes pesados (ej: un gráfico grande) se carguen solo si 
 *    realmente se van a mostrar. Con Suspense mostramos un fallback ("Cargando...") mientras el chunk asíncrono
 *    se descarga.
 *
 * La combinación de estas técnicas es muy poderosa para apps con listas grandes o componentes costosos.
 */

import { lazy, memo, Suspense, useMemo } from 'react';

// React.memo envuelve al componente y evita renders innecesarios si las props no cambiaron.
// Esto es útil cuando el padre se re-renderiza por otros motivos pero los ítems individuales NO cambiaron.
// El log de consola ayuda a visualizar qué items realmente se renderizan.
const ExpensiveItem = memo(function ExpensiveItem({ item, onSelect }) {
  console.log('Rendering item:', item.id);
  return (
    <li
      style={{ cursor: "pointer", padding: "4px 0" }}
      onClick={() => onSelect(item.id)}
    >
      <b>{item.name}</b> — ${item.price}
    </li>
  );
});

// React.lazy permite cargar componentes bajo demanda/code splitting (ideal para chunks pesados).
const HeavyChart = lazy(() => import('./HeavyChart')); // Solo se carga cuando aparece en pantalla

function ProductList({ products, category }) {
  // Filtrado "memorizado": solo se recalcula si products o category cambian.
  const filtered = useMemo(
    () => {
      // El log muestra cuándo realmente ocurre el filtrado (no cada render)
      console.log('Filtrando productos para categoría:', category);
      return products.filter((p) => p.category === category);
    },
    [products, category]
  );

  // Handler de selección (por ejemplo, podrías mostrar info detallada al hacer click)
  // Aquí usamos useMemo para mantener una referencia estable y evitar renders del hijo si no cambia
  const handleSelect = (id) => {
    console.log('Seleccionado producto con id:', id);
    // Aquí podrías hacer otras acciones, como abrir un modal, etc.
  };

  return (
    <div>
      <ul>
        {filtered.map((item) => (
          // Pasar un handler estable y item memoizado optimiza muchísimo listas grandes
          <ExpensiveItem key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>

      {/* 
        Suspense muestra el fallback hasta que HeavyChart termine de cargar (descarga el JS "lazy") 
        Esto reduce el tamaño del bundle inicial y optimiza la performance.
      */}
      <Suspense fallback={<div>Cargando gráfico pesado de ventas...</div>}>
        {/* HeavyChart solo se monta cuando se llega aquí y recibe los productos filtrados */}
        <HeavyChart data={filtered} />
      </Suspense>
    </div>
  );
}

export default ProductList;
