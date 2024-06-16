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
import { SubmitHandler, useForm } from "react-hook-form";
import { IPostulationForm, emptyForm, postulationFormSchema } from "./schema";
import InputControl from "@/lib/components/forms/controls/InputControl";
import TextareaControl from "@/lib/components/forms/controls/TextareaControl";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  vacancy: VacancySubjectName | null;
  onClose: () => void;
}
export default function ModalPostulationForm({ vacancy, onClose }: Props) {
  const { handleSubmit, formState, control } = useForm<IPostulationForm>({
    defaultValues: emptyForm,
    mode: "all",
    resolver: zodResolver(postulationFormSchema),
  });

  const onSubmit: SubmitHandler<IPostulationForm> = (data) => {
    try {
      onClose();
    } catch (error) {}
  };

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
