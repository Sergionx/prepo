"use client";

import { IconNumber123 } from "@tabler/icons-react";
import { submitCreateVacancy, submitUpdateVacancy } from "./action";

import InputControl from "@/lib/components/forms/controls/InputControl";
import TextareaControl from "@/lib/components/forms/controls/TextareaControl";
import { emptyForm, vacantFormSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AutoCompleteControl from "@/lib/components/forms/controls/AutoCompleteControl";
import { Subject } from "@/lib/models/Subject";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import { getFormData } from "@/lib/utils/forms";
import { VacancySubjectName } from "@/lib/models/Vacancy";

import { useEffect } from "react";
import { useAuth } from "@/app/(pages)/(private)/AuthContext";

interface Props {
  onSucess: () => void;
  subjects: Subject[];
  vacancy: VacancySubjectName | null;
}

// FIXME Error raro con los inputs
export default function VacantForm({ onSucess, subjects, vacancy }: Props) {
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: emptyForm,
    mode: "all",
    resolver: zodResolver(vacantFormSchema),
  });

  useEffect(() => {
    if (vacancy) {
      reset({
        description: vacancy.description,
        preparers: vacancy.preparers,
        subject: vacancy.id_materia,
      });
    }
  }, [vacancy]);

  const { user } = useAuth();

  const { onSubmit } = useFormSubmit({
    mode: vacancy ? "edit" : "add",
    addAction: (data) => {
      if (!user) throw new Error("No user found");

      const formData = getFormData(data);
      return submitCreateVacancy(user.id, formData);
    },
    editAction: (data) => {
      if (!vacancy) {
        throw new Error("No vacancy to edit");
      }

      console.log(data);
      const formData = getFormData(data);
      return submitUpdateVacancy(vacancy.id, formData);
    },
    onSucess,
    formState,
  });

  const vacantForm = (
    <form
      id="vacancy"
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 space-y-6 w-full"
    >
      <div className="flex flex-row gap-4">
        <AutoCompleteControl
          label="Materia"
          control={control}
          name="subject"
          items={subjects.map((subject) => ({
            value: subject.id_materia,
            label: subject.nombre,
          }))}
        />

        <InputControl
          label="Preparadores"
          control={control}
          name="preparers"
          type="number"
          className="basis-1/3"
          startContent={<IconNumber123 stroke={2} />}
          min={1}
        />
      </div>
      
      <TextareaControl
        label="Descripción"
        control={control}
        name="description"
      />
    </form>
  );

  return { vacantForm, formState };
}
