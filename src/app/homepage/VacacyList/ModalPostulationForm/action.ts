"use server";

import { createVacancy } from "@/lib/actions/vacancies.service";
import { postulationFormSchema } from "./schema";
import { createPostulation } from "@/lib/actions/postulation.service";

export async function submitVacancy(formData: FormData, id_vacante: number) {
  const dataToPost = {
    subject: formData.get("subject"),
    description: formData.get("description"),
    preparers: Number(formData.get("preparers")),
  };

  console.log(dataToPost);
  try {
    const { description, grade } = postulationFormSchema.parse(dataToPost);

    return await createPostulation({
      description,
      grade,
      id_vacante,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}
