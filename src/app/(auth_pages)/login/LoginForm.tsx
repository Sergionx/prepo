"use client";
import SubmitButton from "@/lib/components/forms/SubmitButton";
import InputControl from "@/lib/components/forms/controls/InputControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "./actions";
import { emptyForm, loginSchema, ILoginForm } from "./schema";

export default function LoginForm() {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...emptyForm },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      // @ts-ignore
      formData.append(key, data[key]);
    }
    await login(formData);
  };

  return (
    <form
      className="flex flex-col gap-4 py-6 space-y-10 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputControl
        label="Email"
        control={control}
        name="email"
        className="max-w-lg"
      />
      <InputControl
        label="Password"
        control={control}
        name="password"
        type="password"
        isInvalid={true}
        className="max-w-lg"
      />
      <SubmitButton
        text="Iniciar Sesión"
        loadingText="Iniciando Sesión"
        className="max-w-lg w-full"
        isLoading={formState.isLoading || formState.isSubmitting}
      ></SubmitButton>
    </form>
  );
}
