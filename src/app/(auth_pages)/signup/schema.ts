import { z } from "zod";

export interface signUpForm {
  email: string;
  password: string;
  id: string;
  type : string;
  name: string;
  lastname: string;
}

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  id: z.string().min(11).max(11),
  type: z.string(),
  name: z.string(),
  lastname: z.string(),
});

export const emptyForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  id: "",
  type: "",
};
