'use client'

import { createHorario } from "@/lib/actions/horario.service";
import { useForm,useFormContext } from "react-hook-form";
import Horario from "../horario/page";
import { postulationFormSchema } from "../VacancyList/ModalPostulationForm/schema";

export async function submitHorario(
    //formData: FormData,  
    //id: number,
    //createdAt: string,
    dia: string,
    hora_Inicio: string,
    hora_Fin: string,
    id_Preparador: number,
    id_Materia: string
  ) {
    const dataToPost = {
      // dia: formData.get("Dia") as string,
      // hora_Inicio: formData.get("hora_Inicio") as string,
      // hora_Fin: formData.get("hora_Fin") as string,
      // id_Preparador: Number(formData.get("id_Preparador")),
      // id_Materia:  formData.get("id_Materia") as string
    };
  
    try {
      //const { dia,hora_Inicio,hora_Fin,id_Preparador,id_Materia} = postulationFormSchema.parse(dataToPost);
      console.log("Bandera")
      await createHorario(dia,hora_Inicio,hora_Fin,id_Preparador,id_Materia);
  
      return `creada con éxito con para la materia ${id_Materia}`;
    } catch (error: any) {
      throw Error('No se pudo enviar la postulación:');
    }
  }

  export async function table{
    
  }


