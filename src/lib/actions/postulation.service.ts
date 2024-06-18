import { Postulation } from "../models/Postulation";
import { createClient } from "../utils/supabase/server";

export async function createPostulation({
  description,
  grade,
  id_vacante,
}: {
  description: string;
  grade: number;
  id_vacante: number;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .insert({
      descripcion: description,
      nota: grade,
      id_estudiante: 20211110120,
      id_vacante,
    })
    .select();

  if (error) throw error;

  // TODO Typear
  const postulation = data[0] as Postulation

  console.log(postulation);
  return postulation;
}

// TODO - Agarrar usuario de la auntenticación
export async function getUserPostulationByVacancyId(id_vacante: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .select("*")
    .eq("id_vacante", id_vacante)
    .eq("id_estudiante", 20211110120);

  if (error) throw error;

  const postulation = data[0] as Postulation

  return postulation;
}
