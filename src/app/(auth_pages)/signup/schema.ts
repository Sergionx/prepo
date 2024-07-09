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
  email: z
    .string()
    .email("El correo electrónico debe ser un correo electrónico válido")
    .regex(
      /^[a-zA-Z0-9._%+-]+@(?:correo.unimet.edu.ve|unimet.edu.ve)$/,
      "El correo electrónico debe terminar en @correo.unimet.edu.ve o @unimet.edu.ve"
    ),
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
