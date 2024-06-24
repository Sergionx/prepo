import { Postulation, PostulationWithUser } from "../models/Postulation";
import { createClient } from "../utils/supabase/server";

export async function createPostulation(
  description: string,
  grade: number,
  id_vacante: number,
  id_student: number
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .insert({
      descripcion: description,
      nota: grade,
      id_estudiante: id_student,
      id_vacante,
    })
    .select();

  if (error) throw error;

  // TODO Typear
  const postulation = data[0] as Postulation;

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

  const postulation = data[0] as Postulation;

  return postulation;
}

// FIXME - Usar partial
export async function updatePostulation(
  id_vacante: number,
  dataToUpdate: any,
  id_student: number
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .update(dataToUpdate)
    .eq("id_estudiante", id_student)
    .eq("id_vacante", id_vacante)
    .select();

  if (error) throw error;

  return data;
}

// TODO - Hacer join con estudiante ademas de solo usuario
export async function getPostulationsByVacancyId(id_vacante: number) {
  await new Promise((resolve) => setTimeout(resolve, 100000));
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .select("*, student:Usuario(*)")
    .eq("id_vacante", id_vacante);

  if (error) throw error;

  return data as PostulationWithUser[];
}
