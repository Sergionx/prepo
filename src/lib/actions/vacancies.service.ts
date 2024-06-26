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

  if (!data) return null;

  const vacancy = data[0] as VacancySubjectName;

  return vacancy;
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

  if (error) throw error;

  const vacancy = data[0] as Vacancy;

  return vacancy;
}
