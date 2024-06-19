"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: {email: string, password: string}) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  

  const { error } = await supabase.auth.signUp(formData)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}