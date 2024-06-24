import { BaseUser } from "./User";

export interface Postulation {
  id_estudiante: number;
  id_vacante: number;
  createdAt: string;
  aceptada: boolean;
  nota: number;
  descripcion: string;
}

export interface PostulationWithUser extends Postulation {
  student: BaseUser;
}
