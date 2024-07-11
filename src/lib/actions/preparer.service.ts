"use server";

import { Subject } from "../models/Subject";
import { Preparador } from "../models/User";
import { createClient } from "../utils/supabase/server";

export async function getAllPreparers() {
  const supabase = createClient();

  

  const students: Preparador[] = [
    {
      nombre: 'Carlos Cárdenas',
      materias: ['Matemática2', 'Física1'],
      foto: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
    },
    {
      nombre: 'Valeria Zampetti',
      materias: ['EDD'],
      foto: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
    },

  ];
  return students;
}
  

