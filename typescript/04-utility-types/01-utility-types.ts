/**
 * TEMA: Utility Types
 * ENTREVISTA: Explica Pick, Omit, Partial, Record, Required.
 *
 * Transforman tipos existentes sin duplicar definiciones.
 */

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// Pick: seleccionar propiedades
type UserPublic = Pick<User, 'id' | 'name' | 'email'>;

// Omit: excluir propiedades (común para DTOs de API)
type UserCreate = Omit<User, 'id'>;
type UserSafe = Omit<User, 'password'>;

// Partial: todo opcional (PATCH requests)
type UserPatch = Partial<UserSafe>;

// Required: todo obligatorio
type UserComplete = Required<UserPatch>;

/**
 * Record<K, V> permite crear un tipo de objeto cuyas claves (K)
 *  están restringidas a un conjunto específico de strings (o números, o símbolos), 
 * y cuyos valores (V) son todos del mismo tipo.
 * Es útil para mapear roles, estados, keys de configuración, etc., a un tipo consistente de valor.
 *
 * Ejemplo: Queremos un objeto que mapea cada rol a un array de permisos habilitados (string[]).
 * Así, si intentamos poner una clave distinta de 'admin' o 'user', TypeScript dará error.
 */
type RolePermissions = Record<'admin' | 'user', string[]>;

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  // invitado: ['read'] // ❌ Error: 'invitado' no está permitido por el tipo RolePermissions
};

// Readonly
type FrozenUser = Readonly<User>;

// Extract / Exclude (con union types)
type Status = 'pending' | 'active' | 'banned' | 'deleted';
type ActiveStatus = Exclude<Status, 'banned' | 'deleted'>;
type OnlyPendingOrActive = Extract<Status, 'pending' | 'active'>;

// NonNullable
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

export type { UserPublic, UserCreate, UserSafe, RolePermissions, ActiveStatus };
