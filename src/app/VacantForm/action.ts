"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { IVacantForm, vacantFormSchema } from "./schema";

export async function createVacant(formData: FormData) {
  const dataToPost = {
    title: formData.get("title"),
    description: formData.get("description"),
    preparers: Number(formData.get("preparers")),
  };

  try {
    const { title, description, preparers } =
      vacantFormSchema.parse(dataToPost);

    const supabase = createClient();

    const { data, error } = await supabase
      .from("vacancies")
      .insert([{ title, description: description, preparers: preparers }])
      .select();

    if (error) return error;

    return data;
  } catch (error) {
    return error;
  }
}
