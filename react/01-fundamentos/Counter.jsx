/**
 * TEMA: State y Re-render
 * ENTREVISTA: ¿Qué provoca un re-render?
 *
 * 1. Cambio de state (useState, useReducer)
 * 2. Cambio de props del padre
 * 3. Cambio de context que consume el componente
 * 4. Re-render del padre (por defecto, hijos también re-renderizan)
 */

import { useState } from 'react';

function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  // setCount(count + 1) en eventos rápidos puede perder updates
  // Mejor: setCount(prev => prev + 1)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Incrementar
      </button>
      <button onClick={() => setCount((prev) => prev - 1)}>
        Decrementar
      </button>
    </div>
  );
}

export default Counter;
