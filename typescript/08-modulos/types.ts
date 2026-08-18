export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserId = User['id'];
