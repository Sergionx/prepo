export interface Vacancy {
  id: number;
  preparers: number;
  description: string;
  abierto: boolean;
  id_materia: string;
  createdAt: string;
  updatedAt?: string;
}

export interface VacancySubjectName extends Vacancy {
  subject: {
    nombre: string;
  };
}
