'use client'
import { createHorario } from "@/lib/actions/horario.service";
import { useForm,useFormContext } from "react-hook-form";
import { submitHorario } from "../prueba2/page";

export default function Horario() {
    const {
        register,
        handleSubmit, 
        formState : { errors }
      } = useForm();
  
    const onSubmit = handleSubmit((data) => {
        submitHorario(data.Dia,data.horaInicio , data.horaFin , 20211110396, 'BPTFI01');
    });

return (
    <main className="py-12 px-6">
      <div className="flex-grow px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Arma Tus Horarios</h1>

        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        
        <div>
            <label htmlFor="Dia">Dia:</label>
                <input
                    type="text"
                    id="dia"
                    {...register('Dia',)}
                />
        </div>

        <div>
            <label htmlFor="Materia">Materia:</label>
                <input
                    type="text"
                    id="materia"
                    {...register('Materia',)}
                />
        </div>

        <div>
            <label htmlFor="HoraInicio">Hora de Inicio:</label>
                <input
                    type="text"
                    id="horainicio"
                    {...register('horaInicio',)}
                />
        </div>

        <div>
            <label htmlFor="HoraFin">Hora de Fin:</label>
                <input
                    type="text"
                    id="horaFin"
                    {...register('horaFin',)}
                />
        </div>

        <button type="submit">Guardar</button>
      </form>
      </div>
    </main>
  );
}