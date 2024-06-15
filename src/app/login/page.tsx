"use client";

import InputControl from "@/lib/components/forms/controls/InputControl";
import { login } from "./actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, emptyForm, loginSchema } from "./schema";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import SubmitButton from "@/lib/components/forms/SubmitButton";

export default function LoginPage() {
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
    <div className="flex flex-row  min-h-screen">
      <main className="flex flex-col justify-center p-10  max-w-md">
        <h1 className="text-4xl mb-4">Prepo</h1>
        <p className="py-4 text-pretty">
          Para acceder al sistema, necesitamos la siguiente información de tu
          parte.
        </p>
        <form
          className="flex flex-col gap-4 py-6 space-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="col col-span-2 md:col-span-1">
            <InputControl label="Email" control={control} name="email" />
          </fieldset>
          <fieldset className="col-span-2 md:col-span-1">
            <InputControl
              label="Password"
              control={control}
              name="password"
              type="password"
              defaultValue="aaaa@correo.unimet.edu.ve"
              isInvalid={true}
              errorMessage="Please enter a valid email"
              className="max-w-xs"
            />
          </fieldset>
          <SubmitButton
            text="Iniciar Sesión"
            isLoading={formState.isLoading || formState.isSubmitting}
          ></SubmitButton>
        </form>
      </main>

      <aside className="w-full basis-3/4 lg:relative h-screen -z-[1] lg:block hidden">
        <Image
          src="/unimet.jpg"
          alt="unimet"
          priority={true}
          fill
          quality={100}
          sizes="50vw"
          className="object-cover mx-lg: brightness-50"
        />
      </aside>

      {/* //<Button formAction={login}>Log in</Button>
          <Button formAction={signup}>Sign up</Button> */}
    </div>
  );
}
