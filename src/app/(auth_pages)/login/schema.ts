import { z } from "zod";


export interface ILoginForm{
email: string;
  password: string;
}


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const emptyForm = {
  email: "",
  password: "",
};
