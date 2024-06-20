"use client";
import SubmitButton from "@/lib/components/forms/SubmitButton";
import InputControl from "@/lib/components/forms/controls/InputControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "./actions";
import { emptyForm, loginSchema } from "./schema";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import { getFormData } from "@/lib/utils/forms";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...emptyForm },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const { onSubmit } = useFormSubmit({
    mode: "add",
    addAction: async (data) => {
      const formData = getFormData(data);
      return await login(formData);
    },

    onSucess: () => {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
    formState,
  });

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
