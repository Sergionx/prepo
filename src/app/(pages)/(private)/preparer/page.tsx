import { useForm } from 'react-hook-form';

export default function ClassesPage() {
  const {
    register,
    handleSubmit, 
    formState : { errors }
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data) //Era para probar si guardaba la data y la resivia bien falta conectar esto y actualizarlo con supabase
  });

  const validateTimeRange = (value) => {
    const [start, end] = value.split('-');
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    return duration <= 90; // Max 1 hora y media
  };

  return (
    <div>
      <h1>Horarios de Clases/Prepas</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="monday">Lunes:</label>
          <input
            type="text"
            id="monday"
            {...register('monday', { required: true, validate: validateTimeRange })}
          />
          {errors.monday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="tuesday">Martes:</label>
          <input
            type="text"
            id="tuesday"
            {...register('tuesday', { required: true, validate: validateTimeRange })}
          />
          {errors.tuesday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="wednesday">Miércoles:</label>
          <input
            type="text"
            id="wednesday"
            {...register('wednesday', { required: true, validate: validateTimeRange })}
          />
          {errors.wednesday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="thursday">Jueves:</label>
          <input
            type="text"
            id="thursday"
            {...register('thursday', { required: true, validate: validateTimeRange })}
          />
          {errors.thursday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <div>
          <label htmlFor="friday">Viernes:</label>
          <input
            type="text"
            id="friday"
            {...register('friday', { required: true, validate: validateTimeRange })}
          />
          {errors.friday && <span>El rango de tiempo no debe exceder 1 hora y media</span>}
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
