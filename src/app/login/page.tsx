"use client";

import InputControl from "@/lib/components/forms/controls/InputControl";
import { login, signup } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emptyForm, loginSchema } from "./schema";
import { Button } from "@nextui-org/button";

export default function LoginPage() {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...emptyForm },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  return (
    <form>
      <InputControl label="Email" control={control} name="email" />
      <InputControl
        label="Password"
        control={control}
        name="password"
        type="password"
      />

      <Button formAction={login}>Log in</Button>
      <Button formAction={signup}>Sign up</Button>
    </form>
  );
}
