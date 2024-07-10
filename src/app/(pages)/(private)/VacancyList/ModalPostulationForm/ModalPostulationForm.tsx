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

import { Postulation } from "@/lib/models/Postulation";
import PostulationForm from "./PostulationForm";
import { useAuth } from "@/app/(pages)/(private)/AuthContext";
import { UserType } from "@/lib/models/User";
import { useRouter } from "next/navigation";

interface Props {
  vacancy: VacancySubjectName | null;
  postulation: Postulation | null;
  onClose: () => void;
}

export default function ModalPostulationForm({
  vacancy,
  postulation,
  onClose,
}: Props) {
  const { postulationForm, formState } = PostulationForm({
    onSucess: onClose,
    postulation: postulation,
    vacancy: vacancy,
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

          <ModalBody className="sm:flex-row sm:pt-0">
            <p className="basis-1/2 mt-2">{vacancy.description}</p>

            <aside
              className="basis-1/2 pt-2
                sm:border-l sm:pl-2
                max-sm:border-t max-sm:pt-2"
            >
              {postulationForm}
            </aside>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>

            <SubmitButton
              form="postulation"
              isLoading={formState.isLoading}
              text={postulation ? "Editar" : "Crear"}
              loadingText={postulation ? "Editando..." : "Creando..."}
            />
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
