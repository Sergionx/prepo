"use server";

import { createUserService } from "@/lib/actions/user.service";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    id: formData.get("id") as string,
    type: Number(formData.get("type")),
    name: formData.get("name") as string,
    lastname: formData.get("lastname") as string,
  };

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) throw error;

  await createUserService(data);
  revalidatePath("/");
  return "Usuario creado con éxito, irá al a login en 3 segundos";
}
