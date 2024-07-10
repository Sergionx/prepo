"use server";

import { revalidatePath } from "next/cache";
import { vacantFormSchema } from "./schema";
import { createVacancy, editVacancy } from "@/lib/actions/vacancies.service";

export async function submitCreateVacancy(
  coordinatorId: number,
  formData: FormData
) {
  const dataToPost = {
    subject: formData.get("subject"),
    description: formData.get("description"),
    preparers: Number(formData.get("preparers")),
  };

  try {
    const { subject, description, preparers } =
      vacantFormSchema.parse(dataToPost);

    await createVacancy(coordinatorId, {
      description,
      preparers,
      id_materia: subject,
    });

    return `Vacante creada con éxito para la materia ${subject}`;
  } catch (error: any) {
    throw Error(`No se pudo crear la vacante: ${error.message}`);
  }
}

export async function submitUpdateVacancy(
  vacancyId: number,
  formData: FormData
) {
  const dataToPost = {
    subject: formData.get("subject"),
    description: formData.get("description"),
    preparers: Number(formData.get("preparers")),
  };

  try {
    console.log(dataToPost);
    const { subject, description, preparers } =
      vacantFormSchema.parse(dataToPost);

    await editVacancy(vacancyId, {
      description,
      preparers,
      id_materia: subject,
    });

    revalidatePath("/vacancies");
    return `Vacante editada con éxito para la materia ${subject}`;
  } catch (error: any) {
    throw Error(`No se pudo editar la vacante: ${error.message}`);
  }
}
