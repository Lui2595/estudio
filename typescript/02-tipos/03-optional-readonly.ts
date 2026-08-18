/**
 * TEMA: Optional, Readonly, Partial
 * Modificadores para contratos más precisos.
 */

interface User {
  readonly id: number;       // No reasignable después de crear
  name: string;
  email?: string;            // Opcional
  role?: 'admin' | 'user';
}

const user: User = { id: 1, name: 'Ana' };
// user.id = 2; // Error: readonly

// Readonly profundo requiere utility o librería
type ReadonlyUser = Readonly<User>;

// Partial convierte todas las propiedades en opcionales, útil cuando queremos actualizar solo algunos campos.
// Aquí usamos Omit para excluir 'id', así nunca se podrá actualizar el id del usuario.
// Es habitual permitir cambios solo en name, email o role al actualizar un usuario existente.
type UserUpdate = Partial<Omit<User, 'id'>>;

function updateUser(id: number, changes: UserUpdate): void {
  console.log(id, changes);
}

updateUser(1, { name: 'Luis' }); // OK sin email ni role

// Required: opuesto de Partial
type RequiredUser = Required<User>;

export type { User, UserUpdate };
