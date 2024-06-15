"use server";

import { vacantFormSchema } from "./schema";
import { createVacancy } from "@/lib/actions/vacancies.service";

export async function submitVacancy(formData: FormData) {
  const dataToPost = {
    subject: formData.get("subject"),
    description: formData.get("description"),
    preparers: Number(formData.get("preparers")),
  };

  console.log(dataToPost);
  try {
    const { subject, description, preparers } =
      vacantFormSchema.parse(dataToPost);

    return await createVacancy({
      description,
      preparers,
      id_materia: subject,
    });
  } catch (error) {
    console.log(error)
    return error;
  }
}
