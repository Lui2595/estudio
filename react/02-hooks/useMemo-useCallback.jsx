/**
 * TEMA: useMemo vs useCallback
 * ENTREVISTA MUY COMÚN: ¿Diferencia entre useMemo y useCallback?
 *
 * - useMemo memoriza un **valor computado** (el resultado de ejecutar una función), 
 * y solo lo vuelve a calcular si alguna de sus dependencias cambia. 
 * Su objetivo principal es **optimizar el rendimiento** cuando tienes cálculos costosos o listas filtradas, 
 * para evitar recalcular en cada render sin necesidad.
 *
 * - useCallback memoriza una **función**; es decir, te da una referencia estable de la función mientras sus dependencias no cambien. 
 * Esto es útil cuando pasas callbacks a componentes hijos que dependen de comparaciones por referencia (React.memo, useEffect, etc.) 
 * y quieres evitar renders innecesarios.
 *
 * Resumen:
 *   - useMemo 👉 memoriza un valor (por ejemplo, una lista filtrada).
 *   - useCallback 👉 memoriza una función (callback estable).
 */

import { useCallback, useMemo, useState } from 'react';

/**
 * Componente ProductList
 *
 * - Muestra una lista de productos con filtro.
 * - Usa useMemo para evitar filtrar y calcular estadísticas inútilmente en cada render.
 * - Usa useCallback para que la función de agregar al carrito no cambie de referencia en cada render.
 */
function ProductList({ products, onAddToCart }) {
  const [filter, setFilter] = useState('');

  // useMemo: solo recalcula el filtrado cuando cambian products o filter.
  const filteredProducts = useMemo(() => {
    console.log('Filtrando productos...');
    // Devuelve los productos cuyo nombre contiene el texto del filtro (ignorando mayúsculas/minúsculas)
    return products.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  // useMemo: calcula algunas estadísticas solo si cambia filteredProducts.
  const stats = useMemo(() => {
    // Si no hay productos, el promedio es 0 para evitar división por 0
    const total = filteredProducts.length;
    const avgPrice =
      total > 0
        ? filteredProducts.reduce((s, p) => s + p.price, 0) / total
        : 0;
    return { total, avgPrice };
  }, [filteredProducts]);

  // useCallback: crea una versión memorizada de la función handleAdd
  // para que no cambie en cada render y evitar renders innecesarios de los hijos.
  const handleAdd = useCallback(
    (productId) => {
      onAddToCart(productId);
    },
    [onAddToCart]
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar productos..."
      />
      <p>
        {stats.total} productos (Precio promedio: ${stats.avgPrice.toFixed(2)})
      </p>
      {filteredProducts.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={handleAdd} />
      ))}
    </div>
  );
}

/**
 * Componente ProductCard
 *
 * - Muestra la info de un producto y tiene un botón para agregar al carrito.
 * - Si la prop onAdd no es estable, este componente podría renderizarse innecesariamente.
 */
function ProductCard({ product, onAdd }) {
  return (
    <div style={{ margin: '8px 0' }}>
      <span>
        {product.name} - ${product.price}
      </span>
      <button style={{ marginLeft: 8 }} onClick={() => onAdd(product.id)}>
        Agregar
      </button>
    </div>
  );
}

export default ProductList;
