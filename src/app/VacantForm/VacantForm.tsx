"use client";

import SubmitButton from "@/lib/components/forms/SubmitButton";
import { Button } from "@nextui-org/button";
import { IconNumber123 } from "@tabler/icons-react";
import { createVacant } from "./action";

import InputControl from "@/lib/components/forms/controls/InputControl";
import TextareaControl from "@/lib/components/forms/controls/TextareaControl";
import { IVacantForm, emptyForm, vacantFormSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function VacantForm() {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...emptyForm },
    mode: "all",
    resolver: zodResolver(vacantFormSchema),
  });

  const onSubmit: SubmitHandler<IVacantForm> = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      // @ts-ignore
      formData.append(key, data[key]);
    }
    await createVacant(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl w-full space-y-6
        p-6 bg-slate-400/20 rounded-lg backdrop-blur-md
        border-2 border-slate-400/50 shadow-lg
        "
    >
      <h4 className="text-lg font-semibold text-center text-balance text-white">
        Vacante para preparadurías
      </h4>

      <div className="flex flex-row gap-4">
        <InputControl label="Título" control={control} name="title" />

        <InputControl
          label="Preparadores"
          control={control}
          name="preparers"
          type="number"
          className="basis-1/3"
          startContent={<IconNumber123 stroke={2} />}
        />
      </div>

      <TextareaControl
        label="Descripción"
        control={control}
        name="description"
      />

      <footer className="flex gap-4">
        <SubmitButton
          isLoading={formState.isLoading || formState.isSubmitting}
        />
        <Button variant="light" className="text-white">
          Cancelar
        </Button>
      </footer>
    </form>
  );
}
