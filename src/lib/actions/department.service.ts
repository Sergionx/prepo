"use server";

import { createClient } from "../utils/supabase/server";

export async function getAllDepartments() {
  const supabase = createClient();

  let { data: department, error } = await supabase
    .from("Departamento")
    .select("*");

  if (error) {
    throw error;
  }

  if (!department) {
    return [];
  }

  return department;
}
