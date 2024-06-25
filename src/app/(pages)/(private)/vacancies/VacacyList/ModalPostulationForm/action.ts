"use server";

import { createVacancy } from "@/lib/actions/vacancies.service";
import { postulationFormSchema } from "./schema";
import {
  createPostulation,
  updatePostulation,
} from "@/lib/actions/postulation.service";

export async function submitPostulation(
  formData: FormData,
  subject: string,
  id_vacante: number,
  id_student: number
) {
  const dataToPost = {
    description: formData.get("description") as string,
    grade: Number(formData.get("grade")),
  };

  try {
    const { description, grade } = postulationFormSchema.parse(dataToPost);

    await createPostulation(description, grade, id_vacante, id_student);

    return `Postulación creada con éxito con para la materia ${subject}`;
  } catch (error: any) {
    throw Error(`No se pudo enviar la postulación: ${error.message}`);
  }
}

export async function editPostulation(
  formData: FormData,
  subject: string,
  id_vacante: number,
  id_student: number
) {
  const descripcion = formData.get("description") as string;
  const nota = Number(formData.get("grade"));

  const dataToPost = {
    ...(descripcion && { descripcion }),
    ...(nota && { nota }),
  };

  try {
    await updatePostulation(id_vacante, dataToPost, id_student);

    return `Postulación editada con éxito con para la materia ${subject}`;
  } catch (error: any) {
    throw Error(`No se pudo editar la postulación: ${error.message}`);
  }
}
