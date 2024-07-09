"use server";
import { revalidatePath } from "next/cache";
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
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .select("*, student:Usuario(*)")
    .eq("id_vacante", id_vacante);

  if (error) throw error;

  return data as PostulationWithUser[];
}

export async function markPostulationStatus(
  id_estudiante: number,
  id_vacante: number,
  status: boolean
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .update({ aceptada: status })
    .eq("id_estudiante", id_estudiante)
    .eq("id_vacante", id_vacante)
    .select();

  if (error) throw error;

  revalidatePath("/vacancies/[id]/postulations");
  return data;
}

export async function markPostulationsStudentStatus(
  id_estudiantes: number[],
  id_vacante: number,
  status: boolean
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .update({ aceptada: status })
    .in("id_estudiante", id_estudiantes)
    .eq("id_vacante", id_vacante)
    .select();

  if (error) throw error;

  revalidatePath("/vacancies/[id]/postulations");

  return data;
}
