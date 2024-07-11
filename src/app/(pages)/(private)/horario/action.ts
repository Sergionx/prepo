import { createHorario } from "@/lib/actions/horario.service";
import { Horario } from "./schema";


export async function submithorario(formData: FormData) {
  const dataToPost = {
    dia: formData.get("dia"),
    hora_Inicio: formData.get("hora_Inicio"),
    hora_Fin: formData.get("hora_Fin"),
    id_Preparador: formData.get("id_Preparador"),
    id_Materia: formData.get("id_Materia"),

  };

  try {
    const { dia, hora_Inicio, hora_Fin,id_Preparador,id_Materia, } =
      Horario.parse(dataToPost);

    await createHorario(dia, hora_Inicio,hora_Fin,id_Preparador,id_Materia);

    return `Horario creado con éxito para la materia`;
  } catch (error: any) {
    throw Error(`No se pudo crear el horario: ${error.message}`);
  }
}