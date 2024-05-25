"use server";

import { IVacantForm, vacantFormSchema } from "./schema";

export async function createVacant(formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    preparers: Number(formData.get("preparers")),
  };

  try {
    const { title, description, preparers } = vacantFormSchema.parse(data);

    console.log("start");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("end");
  } catch (error) {
    return error;
  }
}
