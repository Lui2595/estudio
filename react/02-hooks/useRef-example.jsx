/**
 * TEMA: useRef
 * 
 * ¿Qué hace useRef?
 * - Es un hook de React que nos permite crear una "referencia" mutable que persiste entre renders del componente.
 * - A diferencia de useState, CAMBIAR el valor de un useRef **NO** provoca un re-render del componente.
 * - Muy útil para guardar información "mutable" (contadores, valores temporales, referencias al DOM, timers) que queremos que 
 * sobreviva aunque el componente se vuelva a renderizar, pero que NO queremos que cause re-render automáticamente.
 * 
 * ¿Cuándo usarlo?
 * 1) Guardar referencias a elementos del DOM (por ejemplo, para enfocar un input manualmente).
 * 2) Guardar valores persistentes entre renders SIN causar renders extra, como contadores, valores previos, IDs, timers, etc.
 * 
 * Recuerda:
 * - `.current` es la propiedad que contiene el valor mutable del ref.
 * - Cambiar `.current` NO rerenderiza el componente, solo lo muta internamente.
 */

import { useEffect, useRef, useState } from 'react';

function SearchInput() {
  // Ref para acceder al input DOM y poder enfocarlo
  const inputRef = useRef(null);

  // Ref para contar cuántos renders van. Se actualiza pero NO causa re-render.
  const renderCount = useRef(0);

  // Ref para guardar el valor anterior del input (solo como ejemplo de almacenamiento mutable entre renders)
  const prevValue = useRef('');

  // Estado para guardar lo que escribe el usuario (esto SÍ rerenderiza)
  const [value, setValue] = useState('');

  useEffect(() => {
    // Aumentar el contador de renders en cada render
    renderCount.current += 1;

    // Enfoca automáticamente el input al montar y cada vez que renderiza
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Guardamos el valor previo por demostración
    prevValue.current = value;
  });

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <p>
        <b>Renders:</b> {renderCount.current}
        <br />
        <b>Valor actual:</b> {value}
        <br />
        <b>Valor anterior (usando ref):</b> {prevValue.current}
      </p>
      <p style={{ fontSize: 14, color: "#555" }}>
        <b>Nota:</b> Cambiar el <code>.current</code> de un ref NO vuelve a renderizar el componente.<br />
        Es útil para almacenar cosas mutables o manipular el DOM directamente.
      </p>
    </div>
  );
}

export default SearchInput;
