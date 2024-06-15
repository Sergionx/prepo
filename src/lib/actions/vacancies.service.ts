"use server";
import { Vacancy } from "../models/Vacancy";
import { createClient } from "../utils/supabase/server";

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
