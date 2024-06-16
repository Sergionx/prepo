export interface Vacancy {
  id: string;
  preparers: number;
  description: string;
  abierto: boolean;
  id_materia: string;
  createdAt: string;
  updatedAt: string;
}

export interface VacancySubjectName {
  id: string;
  preparers: number;
  description: string;
  abierto: boolean;
  id_materia: string;
  createdAt: string;
  updatedAt: string;
  subject: {
    nombre: string;
  };
}
