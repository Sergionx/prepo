"use client";
import SubmitButton from "@/lib/components/forms/SubmitButton";
import { VacancySubjectName } from "@/lib/models/Vacancy";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useForm } from "react-hook-form";
import { IPostulationForm, emptyForm, postulationFormSchema } from "./schema";
import InputControl from "@/lib/components/forms/controls/InputControl";
import TextareaControl from "@/lib/components/forms/controls/TextareaControl";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import { submitPostulation } from "./action";
import { getFormData } from "@/lib/utils/forms";

interface Props {
  vacancy: VacancySubjectName | null;
  onClose: () => void;
}

// TODO - Intentar hacer fetch con id de estudiante para saber si se postuló y habilitar el edit
export default function ModalPostulationForm({ vacancy, onClose }: Props) {
  const { handleSubmit, formState, control, reset } = useForm<IPostulationForm>(
    {
      defaultValues: emptyForm,
      mode: "all",
      resolver: zodResolver(postulationFormSchema),
    }
  );

  const { onSubmit } = useFormSubmit({
    mode: "add",
    addAction: (data) => {
      if (!vacancy?.id)
        return Promise.resolve("No se pudo enviar la postulación");
      const formData = getFormData(data);
      return submitPostulation(formData, vacancy.subject.nombre, vacancy?.id);
    },
    onSucess: () => {
      onClose();
      reset();
    },
    formState,
  });

  return (
    <Modal
      isOpen={!!vacancy}
      isDismissable
      size="3xl"
      classNames={{
        header: "border-b border-gray-200",
      }}
      placement="center"
      onClose={onClose}
    >
      {vacancy && (
        <ModalContent>
          <ModalHeader className="justify-center">
            {vacancy.subject.nombre}
          </ModalHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody className="sm:flex-row sm:pt-0">
              <p className="basis-1/2 mt-2">{vacancy.description}</p>

              <aside
                className="space-y-6 basis-1/2 pt-2
                sm:border-l sm:pl-2
                max-sm:border-t max-sm:pt-2"
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
              </aside>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>

              <SubmitButton
                isLoading={formState.isLoading || formState.isSubmitting}
              />
            </ModalFooter>
          </form>
        </ModalContent>
      )}
    </Modal>
  );
}
