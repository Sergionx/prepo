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

import { useRouter } from "next/navigation";
import VacantForm from "./VacantForm";
import { Subject } from "@/lib/models/Subject";
import AutoCompleteControl from "@/lib/components/forms/controls/AutoCompleteControl";
import InputControl from "@/lib/components/forms/controls/InputControl";
import TextareaControl from "@/lib/components/forms/controls/TextareaControl";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import { getFormData } from "@/lib/utils/forms";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconNumber123 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { submitCreateVacancy } from "./action";
import { emptyForm, vacantFormSchema } from "./schema";
import { useEffect } from "react";
import { isEmpty } from "@/lib/utils/objects";

interface Props {
  vacancy: VacancySubjectName | null;
  subjects: Subject[];
  onClose: () => void;
  afterClose: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ModalVacantForm({
  vacancy,
  subjects,
  isOpen,
  onOpenChange,
  onClose: onCloseProps,
  afterClose,
}: Props) {
  const router = useRouter();

  const mode = vacancy ? "edit" : "create";

  const { vacantForm, formState } = VacantForm({
    onSucess: onCloseProps,
    vacancy: vacancy,
    subjects: subjects,
  });

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      size="3xl"
      classNames={{
        header: "border-b border-gray-200",
      }}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={afterClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="justify-center">
              {vacancy ? "Editar vacante" : "Crear vacante"}
            </ModalHeader>

            <ModalBody className="sm:flex-row sm:pt-0">{vacantForm}</ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>

              {vacancy && (
                <Button
                  variant="bordered"
                  color="secondary"
                  onPress={() =>
                    router.push(`/vacancies/${vacancy.id}/postulations`)
                  }
                >
                  Ver postulantes
                </Button>
              )}

              <SubmitButton
                form="vacancy"
                isLoading={formState.isLoading}
                text={vacancy ? "Editar" : "Crear"}
                disabled={
                  mode === "edit" &&
                  (!vacancy || isEmpty(formState.dirtyFields))
                }
                loadingText={vacancy ? "Editando..." : "Creando..."}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
