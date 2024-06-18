import { z } from "zod";

export interface IPostulationForm {
  description: string;
  grade: number;
}

export const postulationFormSchema = z.object({
  description: z
    .string()
    .min(10, "La descripción necesista al menos 10 caracteres")
    .max(300, "La descripción no puede tener más de 300 caracteres"),
  grade: z
    .number()
    .int()
    .min(10, "La nota debe ser mínimo 10")
    .max(20, "La nota no puede ser mayor a 20"),
});

export const emptyForm: IPostulationForm = {
  description: "",
  grade: 0,
};
