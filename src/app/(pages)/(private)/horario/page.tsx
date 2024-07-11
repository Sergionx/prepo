"use client";
import { createHorario } from "@/lib/actions/horario.service";
import { useForm, useFormContext } from "react-hook-form";

export default function Horario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <main className="py-12 px-6">
      <div className="flex-grow px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Arma Tus Horarios</h1>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            submitHorario(
              data.Dia,
              data.horaInicio,
              data.horaFin,
              20211110396,
              "BPTFI01"
            );
          })}
        >
          <div>
            <label htmlFor="Dia">Dia:</label>
            <input type="text" id="dia" {...register("Dia")} />
          </div>

          <div>
            <label htmlFor="Materia">Materia:</label>
            <input type="text" id="materia" {...register("Materia")} />
          </div>

          <div>
            <label htmlFor="HoraInicio">Hora de Inicio:</label>
            <input type="text" id="horainicio" {...register("horaInicio")} />
          </div>

          <div>
            <label htmlFor="HoraFin">Hora de Fin:</label>
            <input type="text" id="horaFin" {...register("horaFin")} />
          </div>

          <button type="submit">Guardar</button>
        </form>
      </div>
    </main>
  );
}
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
    console.log("Bandera");
    await createHorario(dia, hora_Inicio, hora_Fin, id_Preparador, id_Materia);

    return `creada con éxito con para la materia ${id_Materia}`;
  } catch (error: any) {
    throw Error("No se pudo enviar la postulación:");
  }
}
