"use client";

import InputControl from "@/lib/components/forms/controls/InputControl";
import { emptyForm, signUpForm, signupSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import SubmitButton from "@/lib/components/forms/SubmitButton";
import SelectControl from "@/lib/components/forms/controls/SelectControl";

const usuarios = [
  { key: "profesores", label: "Profesor" },
  { key: "estudiante", label: " Estudiante" },
  { key: "Coordinador", label: "Coordinador" },
];

export default function SignUp() {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...emptyForm },
    mode: "all",
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<signUpForm> = (data) => {};

  return (
    <div className="flex flex-row  min-h-screen w-[100%]">
      <main className="flex flex-col justify-center p-10  basis-1/2 w-full">
        <h1 className="text-4xl mb-4">Prepo</h1>
        <p className="py-4 text-pretty">
          Para acceder al sistema, necesitamos la siguiente información de tu
          parte.
        </p>
        <form
          className=" gap-4 py-6 gap-y-10 grid grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputControl label="Name" control={control} name="name" />

          <InputControl
            label="Lastname"
            control={control}
            name="lastname"
            type="lastname"
            className="max-w-xs"
          />

          <InputControl
            label="Email"
            control={control}
            name="email"
            type="email"
            defaultValue="aaaa@correo.unimet.edu.ve"
            isInvalid={true}
            errorMessage="Please enter a valid email"
            className="max-w-xs"
          />
          <InputControl
            label="type"
            control={control}
            name="password"
            type="password"
            defaultValue="aaaa@correo.unimet.edu.ve"
            isInvalid={true}
            errorMessage="Please enter a valid email"
            className="max-w-xs"
          />
          <InputControl
            label="Carnet o cedula"
            control={control}
            name="id"
            type="id"
            className="max-w-xs"
          />
          <SelectControl
            label="Tipo de usuario"
            control={control}
            name="type"
            items={usuarios}
            className="max-w-xs"
          />

          <SubmitButton
            text="Iniciar Sesión"
            isLoading={formState.isLoading || formState.isSubmitting}
            className="col-span-2 w-[50%] justify-self-center"
          ></SubmitButton>
        </form>
      </main>

      <aside className="w-full basis-1/2 lg:relative h-screen -z-[1] lg:block hidden">
        <Image
          src="/unimet.jpg"
          alt="unimet"
          priority={true}
          fill
          quality={100}
          sizes="50vw"
          className="object-cover mx-lg: brightness-50 "
        />
      </aside>

      {/* //<Button formAction={login}>Log in</Button>
          <Button formAction={signup}>Sign up</Button> */}
    </div>
  );
}
