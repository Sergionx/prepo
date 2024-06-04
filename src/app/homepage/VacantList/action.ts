import { Vacancy } from "@/lib/models/Vacancy";
import { createClient } from "@/lib/utils/supabase/server";

export async function getVacancies(): Promise<Vacancy[]> {
  const supabase = createClient();

  let { data: vacancies, error } = await supabase.from("vacancies").select("*");

  if (error) {
    throw error;
  }

  if (!vacancies) {
    return [];
  }

  return vacancies;
}
