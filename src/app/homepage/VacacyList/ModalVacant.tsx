import { VacancySubjectName } from "@/lib/models/Vacancy";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

interface Props {
  vacancy: VacancySubjectName | null;
  onClose: () => void;
}
export default function ModalVacant({ vacancy, onClose }: Props) {
  return (
    <Modal isOpen={!!vacancy} isDismissable onClose={onClose}>
      <ModalContent>
        {vacancy && (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {vacancy.subject.nombre}
            </ModalHeader>
            <ModalBody>{vacancy.description}</ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Postularse
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
