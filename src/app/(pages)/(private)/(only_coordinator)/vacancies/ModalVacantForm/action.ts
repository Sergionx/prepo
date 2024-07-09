"use server";

import { vacantFormSchema } from "./schema";
import { createVacancy } from "@/lib/actions/vacancies.service";

export async function submitVacancy(formData: FormData) {
  const dataToPost = {
    subject: formData.get("subject"),
    description: formData.get("description"),
    preparers: Number(formData.get("preparers")),
  };

  try {
    const { subject, description, preparers } =
      vacantFormSchema.parse(dataToPost);

    await createVacancy({
      description,
      preparers,
      id_materia: subject,
    });

    return `Vacante creada con éxito para la materia ${subject}`;
  } catch (error: any) {
    throw Error(`No se pudo crear la vacante: ${error.message}`);
  }
}
