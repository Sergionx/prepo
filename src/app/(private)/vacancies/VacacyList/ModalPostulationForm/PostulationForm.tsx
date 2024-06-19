"use client";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import { getFormData } from "@/lib/utils/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editPostulation, submitPostulation } from "./action";
import { IPostulationForm, emptyForm, postulationFormSchema } from "./schema";
import InputControl from "@/lib/components/forms/controls/InputControl";
import TextareaControl from "@/lib/components/forms/controls/TextareaControl";
import { Postulation } from "@/lib/models/Postulation";
import { VacancySubjectName } from "@/lib/models/Vacancy";

interface Props {
  onSucess: () => void;
  postulation: Postulation | null;
  vacancy: VacancySubjectName | null;
}

export default function PostulationForm({
  onSucess,
  postulation,
  vacancy,
}: Props) {
  const { handleSubmit, formState, control, reset } = useForm<IPostulationForm>(
    {
      defaultValues: emptyForm,
      values: postulation
        ? {
            grade: postulation.nota,
            description: postulation.descripcion,
          }
        : emptyForm,
      mode: "all",

      resolver: zodResolver(postulationFormSchema),
    }
  );

  const { onSubmit } = useFormSubmit({
    mode: postulation ? "edit" : "add",
    addAction: (data) => {
      if (!vacancy?.id)
        return Promise.resolve("No se pudo enviar la postulación");
      const formData = getFormData(data);
      return submitPostulation(formData, vacancy.subject.nombre, vacancy?.id);
    },
    editAction: (data) => {
      if (!vacancy?.id)
        return Promise.resolve("No se pudo enviar la postulación");
      const formData = getFormData(data);
      return editPostulation(formData, vacancy.subject.nombre, vacancy?.id);
    },
    onSucess: () => {
      onSucess();
      reset();
    },
    formState,
  });

  const postulationForm = (
    <form
      id="postulation"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <InputControl
        name="grade"
        label={"Nota en la materia"}
        control={control}
        type="number"
        max={20}
        min={1}
      />
      <TextareaControl
        name="description"
        label="Descripción"
        control={control}
      />
    </form>
  );

  return { postulationForm, formState };
}
