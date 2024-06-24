export enum UserType {
  ADMIN = 1,
  COORDINATOR = 2,
  STUDENT = 3,
}

export interface BaseUser {
  id: number;
  nombre: string;
  correo: string;
  tipo_usuario: UserType;
  updatedAt: string;
}
