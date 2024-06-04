import { Vacancy } from "@/lib/models/Vacancy";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

interface Props {
  vacancy: Vacancy | null;
  onClose: () => void;
}
export default function ModalVacant({ vacancy, onClose }: Props) {
  if (!vacancy) return null;

  return (
    <Modal
      isOpen={!!vacancy}
      isDismissable
      onClose={onClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {vacancy.title}
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
