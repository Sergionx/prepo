export interface Vacancy {
  id: number;
  preparers: number;
  description: string;
  abierto: boolean;
  id_materia: string;
  preparadores_restantes: number;
  createdAt: string;
  updatedAt?: string;
}

export interface VacancySubjectName extends Vacancy {
  subject: {
    nombre: string;
  };
}
