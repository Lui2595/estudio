/**
 * TEMA: useEffect
 * ENTREVISTA: ¿Cuándo se ejecuta useEffect?
 *
 * useEffect es un hook que nos permite ejecutar código "secundario" (efectos) en componentes funcionales
 * de React. Ese código se ejecuta DESPUÉS de que el componente se haya renderizado en el DOM,
 * es decir, nunca durante la fase de render. Así evitamos bloquear la UI con tareas costosas.
 *
 * ¿Para qué sirve? Para sincronizar nuestro componente con algo “externo” al ciclo de React:
 * - Lectura/escritura en el DOM (títulos, foco, clases CSS)
 * - Suscripciones a websockets, eventos, timers (setInterval, setTimeout)
 * - Peticiones asíncronas de datos (fetch, axios, etc)
 * - Limpieza de recursos (cleanup) al desmontar un componente/actualizar dependencia
 *
 * El array de dependencias le dice a React CUÁNDO debe re-ejecutar el efecto.
 * - Si NO pones array: corre tras CADA render (desaconsejado)
 * - Si es array vacío []: solo una vez, al montar el componente (como componentDidMount)
 * - Si pones [userId]: se vuelve a ejecutar SOLO cuando cambie userId
 */

import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  // user: guarda la información del usuario actual
  const [user, setUser] = useState(null);
  // loading: indica si estamos esperando la respuesta del servidor
  const [loading, setLoading] = useState(true);

  // 👇 Ejemplo: useEffect sin dependencias — se ejecuta en cada render (casi nunca recomendable)
  // useEffect(() => { ... });

  // 👇 Solo se ejecuta una vez: al montar el componente
  useEffect(() => {
    document.title = 'Mi App'; // Cambiamos el título de la página
    // Este efecto no tiene dependencias, así que nunca se vuelve a ejecutar ni actualiza
  }, []);

  // 👇 Este efecto se ejecuta cada vez que cambie el userId.
  // Utilizamos este patrón para cargar datos que dependen de una prop/variable.
  useEffect(() => {
    let cancelled = false; // Para evitar setState en un componente desmontado

    async function fetchUser() {
      setLoading(true); // Indicamos que está cargando
      try {
        // Pedimos los datos del usuario a la API (simulado)
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (!cancelled) { // Solo actualizamos si el componente sigue montado
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setUser(null);
          setLoading(false);
          // Podríamos mostrar un mensaje de error aquí
        }
      }
    }

    fetchUser();

    // Cleanup: Esta función se ejecuta ANTES de la próxima ejecución del effect,
    // o cuando el componente se desmonta. Así evitamos actualizar el estado en componentes desmontados.
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>No se encontró el usuario.</p>;
  return <h1>{user?.name}</h1>;
}

export default UserProfile;
