"use server";

import { Subject } from "../models/Subject";
import { createClient } from "../utils/supabase/server";

export async function getAllSubjects() {
  const supabase = createClient();

  let { data: subjects, error } = await supabase.from("Materia").select("*");

  if (error) {
    throw error;
  }

  if (!subjects) {
    return [];
  }

  return subjects as Subject[];
}
