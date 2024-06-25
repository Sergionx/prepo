import { z } from "zod";

export interface IVacantForm {
  description: string;
  preparers: number;
  subject: string;
}

export const vacantFormSchema = z.object({
  subject: z.string(),
  description: z
    .string()
    .min(10, "La descripción necesista al menos 10 caracteres")
    .max(300, "La descripción no puede tener más de 300 caracteres"),
  preparers: z
    .number()
    .int()
    .positive("El número de preparadores debe ser al menos 1"),
});

export const emptyForm: IVacantForm = {
  description: "",
  preparers: 0,
  subject: "",
};
