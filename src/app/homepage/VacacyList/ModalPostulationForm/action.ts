"use server";

import { createVacancy } from "@/lib/actions/vacancies.service";
import { postulationFormSchema } from "./schema";
import { createPostulation } from "@/lib/actions/postulation.service";

export async function submitPostulation(
  formData: FormData,
  subject: string,
  id_vacante: number
) {
  const dataToPost = {
    description: formData.get("description") as string,
    grade: Number(formData.get("grade")),
  };

  try {
    const { description, grade } = postulationFormSchema.parse(dataToPost);

    await createPostulation({
      description,
      grade,
      id_vacante,
    });

    return `Postulación creada con éxito con para la materia ${subject}`;
  } catch (error: any) {
    throw Error(`No se pudo enviar la postulación: ${error.message}`);
  }
}
