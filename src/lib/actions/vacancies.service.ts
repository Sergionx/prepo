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
    .select("*, subject:Materia(nombre)");

  if (error) {
    throw error;
  }

  if (!vacancies) {
    return [];
  }

  return vacancies;
}

export async function createVacancy({
  id_materia,
  description,
  preparers,
}: {
  id_materia: string;
  description: string;
  preparers: number;
}) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("Vacancies")
      .insert({
        id_materia: id_materia,
        description,
        preparers,
        id_coord: -1,
      })
      .select();

    if (error) return error;

    const vacancy = data[0] as Vacancy;

    return vacancy;
  } catch (error) {
    return error;
  }
}
