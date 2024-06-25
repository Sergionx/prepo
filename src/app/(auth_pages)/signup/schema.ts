import { z } from "zod";

export interface signUpForm {
  email: string;
  password: string;
  id: string;
  type: number;
  name: string;
  lastname: string;
  departamento?: string;
}

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  id: z
    .string()
    .min(11)
    .max(11)
    .refine((value) => /^\d+$/.test(value), {
      message: "El carnet del usuario debe ser un número entero",
    }),
  type: z.string(),
  name: z.string(),
  lastname: z.string(),
});

export const emptyForm: signUpForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  id: "",
  type: 0,
};
