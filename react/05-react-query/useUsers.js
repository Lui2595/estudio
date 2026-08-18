/**
 * TEMA: TanStack Query (React Query)
 *
 * Este archivo ejemplifica cómo utilizar React Query (TanStack Query) para manejar
 * el fetching, caché y actualización optimista ("optimistic updates") de una lista de usuarios.
 *
 * - **Cache:** React Query mantiene una copia local ("cacheada") de los datos para evitar fetchs innecesarios, mejorar la performance,
 *   y mantener la UI actualizada rápidamente.
 * - **Invalidation:** Tras mutaciones como crear, editar o borrar, podemos "invalidar" queries. Esto le dice a React Query que debe
 *   refetchear esos datos para asegurarse de tener la versión actualizada desde el backend.
 * - **Optimistic updates:** Ejecuta actualizaciones inmediatas en la UI tras una acción (por ejemplo, agregar un nuevo usuario a la lista)
 *   *antes* de que el servidor lo confirme, dando la percepción de mayor velocidad. Si la petición falla, podemos revertir usando la previa caché.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Función para obtener todos los usuarios desde el backend.
const fetchUsers = async () => {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Error al cargar usuarios');
  return res.json();
};

/**
 * SOBRE "QUERY KEYS":
 * 
 * En React Query, las "query keys" son arrays (o strings) que identifican
 * de manera única una consulta en la caché.
 * 
 * Ejemplos:
 * - ['users']                      → la lista completa de usuarios.
 * - ['users', userId]              → un usuario específico.
 * - ['users', { status: 'active'}] → usuarios filtrados bajo cierta condición.
 * 
 * Usar buenas query keys permite que React Query administre correctamente
 * cada caché, invalidando y actualizando solo lo necesario.
 */

export function useUsers() {
  return useQuery({
    queryKey: ['users'],       // Identifica el caché de la lista de usuarios
    queryFn: fetchUsers,       // Función que obtiene los datos
    staleTime: 5 * 60 * 1000,  // (Opcional) Considera "fresca" la data por 5 minutos
    gcTime: 10 * 60 * 1000,    // (Opcional) Mantiene la data en caché por 10 minutos tras dejar de usarse
  });
}

/**
 * Hook para crear un usuario usando React Query con actualización optimista.
 * 
 * ¿Qué es una "optimistic update"?
 * 1. Cuando el usuario crea uno nuevo, *antes* de esperar la respuesta del backend,
 *    actualizamos la UI localmente (agregando el usuario), mostrando feedback instantáneo.
 * 2. Si la petición falla, revertimos el cambio utilizando un snapshot previo del caché.
 * 3. Si la petición es exitosa, invalidamos la query para asegurar que los datos
 *    finales sean consistentes con el backend.
 */
/**
 * EJEMPLO: Cómo se aplicaría el useCreateUser (optimistic update + React Query) en un componente.
 * 
 * A continuación, mostramos un componente que:
 * - Renderiza el formulario para crear usuarios.
 * - Muestra la lista de usuarios.
 * - Utiliza el hook useUsers para obtener datos y useCreateUser para crear usuarios con actualización optimista.
 */

import React, { useState } from "react";
import { useUsers } from "./useUsers"; // Importa el hook de la lista (ya definido más arriba)
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) =>
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then((r) => r.json()),
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previous = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (old = []) => [
        ...old,
        { ...newUser, id: "temp-" + Date.now() },
      ]);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["users"], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function UsersComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser.mutate({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={createUser.isLoading}>
          Crear Usuario
        </button>
      </form>

      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <ul>
          {users?.map((u) => (
            <li key={u.id}>
              {u.name} ({u.email})
              {String(u.id).startsWith("temp-") && (
                <span style={{ color: "orange", marginLeft: 8 }}>
                  (Pendiente...)
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}