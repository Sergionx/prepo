"use server";

import { signUpForm } from "@/app/(auth_pages)/signup/schema";
import { createClient } from "../utils/supabase/server";
import { ILoginForm } from "@/app/(auth_pages)/login/schema";

function validarCorreo(correo: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@(?:correo.unimet.edu.ve|unimet.edu.ve)$/;
  return regex.test(correo);
}

export async function createUserService(data: signUpForm) {
  const supabase = createClient();

  // Validar el correo electrónico
  if (!validarCorreo(data.email)) {
    throw new Error(
      "El correo electrónico debe terminar en @correo.unimet.edu.ve o @unimet.edu.ve"
    );
  }

  let { data: usuario, error } = await supabase
    .from("Usuario")

    .insert([
      {
        correo: data.email,
        nombre: data.name,
        //password: data.password,
        id: Number(data.id),
        id_departamento: Number(data.departamento),
      
      },
    ]);

  if (error) {
    throw error;
  }

  if (!usuario) {
    return null;
  }

  return usuario;
}

export async function loginUserServic(data: ILoginForm) {
  const supabase = createClient();

  let { data: usuario, error } = await supabase
    .from("Usuario")
    .select("*")
    .eq("correo", data.email)
    .single();

  if (error) {
    throw error;
  }

  if (!usuario) {
    return null;
  }

  return usuario;
}

export async function getUserByEmail(email: string) {
  const supabase = createClient();

  let { data: usuario, error } = await supabase
    .from("Usuario")
    .select("id, nombre, correo, tipo_usuario, updatedAt")
    .eq("correo", email)
    .single();

  if (error) {
    throw error;
  }

  return usuario;
}
