"use server";
import { QueryData } from "@supabase/supabase-js";
import { Vacancy, VacancySubjectName } from "../models/Vacancy";
import { createClient } from "../utils/supabase/server";

export async function getVacancies(): Promise<Vacancy[]> {
  const supabase = createClient();

  let { data: vacancies, error } = await supabase.from("Vacancies").select("*");

  if (error) {
    throw error;
  }

  if (!vacancies) {
    return [];
  }

  return vacancies;
}

export async function getVacancies_SubjectName(): Promise<
  VacancySubjectName[]
> {
  const supabase = createClient();

  let { data: vacancies, error } = await supabase
    .from("Vacancies")
    .select("*, subject:Materia(nombre)")
    .filter("abierto", "eq", true);

  if (error) {
    throw error;
  }

  if (!vacancies) {
    return [];
  }

  return vacancies;
}

export async function getVacancies_SubjectName_ById(vacancyId: number) {
  const supabase = createClient();

  let { data, error } = await supabase
    .from("Vacancies")
    .select("*, subject:Materia(nombre)")
    .eq("id", vacancyId);

  if (error) {
    throw error;
  }

  if (!data) throw new Error("Vacante no encontrada");

  const vacancy = data[0] as VacancySubjectName;

  return vacancy;
}

export async function createVacancy(
  coordinatorId: number,
  {
    id_materia,
    description,
    preparers,
  }: {
    id_materia: string;
    description: string;
    preparers: number;
  }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Vacancies")
    .insert({
      id_materia: id_materia,
      description,
      preparers,
      id_coord: coordinatorId,
    })
    .select();

  if (error) throw error;

  const vacancy = data[0] as Vacancy;

  return vacancy;
}

export async function editVacancy(
  vacancyId: number,
  dataToUpdate: Partial<Vacancy>
) {
  const supabase = createClient();

  console.log(dataToUpdate, vacancyId);

  const { data, error } = await supabase
    .from("Vacancies")
    .update({
      ...dataToUpdate,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", vacancyId)
    .select();

  if (error) throw error;

  const vacancy = data[0] as Vacancy;

  return vacancy;
}
