import { z } from "zod";

export interface IVacantForm {
  title: string;
  description: string;
  preparers: number;
}

export const vacantFormSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(300),
  preparers: z.number().int().positive(),
})

export const emptyForm: IVacantForm = {
  title: '',
  description: '',
  preparers: 0,
}