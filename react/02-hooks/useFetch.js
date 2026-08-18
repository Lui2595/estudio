/**
 * TEMA: Custom Hooks
 *
 * Los Custom Hooks en React te permiten extraer lógica reutilizable de tus componentes y compartirla fácilmente entre ellos.
 * Por convención, deben empezar con "use" (por ejemplo: useFetch, useUser, useDebounce).
 * 
 * ¿Por qué crear un custom hook?
 * - Cuando tienes efectos secundarios, estados, o lógica que se repite en varios componentes y quieres evitar duplicar código.
 * - Permiten encapsular toda la gestión de datos (peticiones, estados, manejo de errores) en un solo lugar y hacer tus componentes más limpios.
 *
 * -- useFetch --
 * Este ejemplo implementa un custom hook llamado useFetch que facilita hacer peticiones a APIs.
 * Maneja automáticamente los estados de "loading", "data" y "error", de modo que el componente que lo use no tenga que preocuparse de esa lógica.
 * Recibe como único argumento una URL.
 * 
 * ¿Qué expone?
 * - data: El dato devuelto por la API (inicialmente null)
 * - loading: Indica si la petición está en curso (boolean)
 * - error: Mensaje de error en caso de fallo de la petición (o null si no hay error)
 * 
 * Además, el hook cancela la actualización del estado si el componente se desmonta antes de que la petición termine, evitando memory leaks y warnings de React.
 */

import { useEffect, useState } from 'react';

export function useFetch(url) {
  // Guarda la respuesta de la petición
  const [data, setData] = useState(null);
  // Booleano para saber si la petición sigue en curso
  const [loading, setLoading] = useState(true);
  // Almacena el error en caso de que falle la petición
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flag para saber si el componente está aun montado
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);   // Comienza la petición, mostramos loading
        setError(null);     // Borramos cualquier error anterior
        // Hacemos la petición a la URL dada
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        // Parseamos la respuesta como JSON
        const json = await response.json();
        // Solo actualizamos si el componente sigue presente (no desmontado)
        if (!cancelled) setData(json);
      } catch (err) {
        // Si ocurre un error y el componente sigue montado, lo guardamos
        if (!cancelled) setError(err.message);
      } finally {
        // Al finalizar (éxito o error), actualizamos loading si el componente no fue desmontado
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    // Cleanup: si el componente se desmonta, cambiamos cancelled para no actualizar el estado posteriormente
    return () => { cancelled = true; };
  }, [url]); // Se vuelve a ejecutar sólo si cambia la URL

  // Devolvemos un objeto con el estado de la petición
  return { data, loading, error };
}

/**
 * USO EJEMPLO:
 * 
 * function MiComponente() {
 *   const { data: users, loading, error } = useFetch('/api/users');
 *   if (loading) return <p>Cargando...</p>;
 *   if (error) return <p>Hubo un error: {error}</p>;
 *   return <pre>{JSON.stringify(users, null, 2)}</pre>;
 * }
 */
