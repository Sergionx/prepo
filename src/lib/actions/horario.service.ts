"use server";
import { Horario } from "../models/Horario";
import { createClient } from "../utils/supabase/server";

export async function createHorario(
    dia: string,
    hora_Inicio: string,
    hora_Fin: string,
    id_Preparador:number,
    id_Materia:string
) {
    const supabase = createClient();
    dia: 'Lunes'
    hora_Inicio: '11:00'
    hora_Fin: '12:00'
    id_Preparador:'20211110396'
    id_Materia: 'BPTFI01'
    console.log("Bandera2")
    //console.log(data)
    
    const { data, error } = await supabase
      .from("Horario")
      .insert({
        dia:dia,
        hora_Inicio:hora_Inicio,
        hora_Fin:hora_Fin,
        id_Preparador:id_Preparador,
        id_Materia:id_Materia
      })
      .select();
      console.log(data)
  
    if (error) throw error;
  
    const horario = data[0] as Horario;
  
    return horario;
  }

  export async function getHorarios(): Promise<Horario[]> {
    const supabase = createClient();
  
    let { data: horario, error } = await supabase.from("Horarios").select("*");
  
    if (error) {
      throw error;
    }
  
    if (!horario) {
      return [];
    }
  
    return horario;
  }
  