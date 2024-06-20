export interface BaseUser {
  id: number;
  nombre: string;
  correo: string;
  tipo_usuario: 1 | 2 | 3;
  updatedAt: string;
}
