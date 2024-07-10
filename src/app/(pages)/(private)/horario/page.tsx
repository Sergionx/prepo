'use client'
import { useForm,useFormContext } from "react-hook-form";

export default function Horario() {
    const {
        register,
        handleSubmit, 
        formState : { errors }
      } = useForm();
      const onSubmit = handleSubmit((data) => {
        const filteredData = Object.entries(data)
        .filter(([day, value]) => value !== '')
        .reduce((acc, [day, value]) => {
        acc[day] = value;
        return acc;
      }, {});

        console.log(filteredData); //Era para probar si guardaba la data y la resivia bien falta conectar esto y actualizarlo con supabase
      });

      const validateTimeRange = (value) => {
        if (!value) return true;
        const [start, end] = value.split('-');
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
    
        const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
        return duration <= 90; // Max 1 hora y media
      };


return (
    <main className="py-12 px-6">
      <div className="flex-grow px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Arma Tus Horarios</h1>

        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
           
        <div>
          <label htmlFor="monday">Lunes:</label>
          <input
            type="text"
            id="monday"
            {...register('monday', {validate: validateTimeRange })}
          />
          {errors.monday && <span> No debe estar vacio o exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="tuesday">Martes:</label>
          <input
            type="text"
            id="tuesday"
            {...register('tuesday', {validate: validateTimeRange })}
          />
          {errors.tuesday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="wednesday">Miércoles:</label>
          <input
            type="text"
            id="wednesday"
            {...register('wednesday', { validate: validateTimeRange })}
          />
          {errors.wednesday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="thursday">Jueves:</label>
          <input
            type="text"
            id="thursday"
            {...register('thursday', { validate: validateTimeRange })}
          />
          {errors.thursday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="friday">Viernes:</label>
          <input
            type="text"
            id="friday"
            {...register('friday', { validate: validateTimeRange })}
          />
          {errors.friday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <button type="submit">Guardar</button>
      </form>
      </div>
    </main>
  );
}