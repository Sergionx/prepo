"use client";
import { PostulationWithUser } from "@/lib/models/Postulation";
import { VacancySubjectName } from "@/lib/models/Vacancy";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  User,
  Spinner,
} from "@nextui-org/react";
import { act, useState } from "react";

interface Props {
  vacancy: VacancySubjectName;
  postulation: PostulationWithUser | null;
  onClose: () => void;
  markPostulation: (
    postulation: PostulationWithUser,
    mode: boolean
  ) => Promise<void>;
}

export default function ModalPostulation({
  vacancy,
  postulation,
  onClose,
  markPostulation,
}: Props) {
  const [loadingMarkPostulation, setLoadingMarkPostulation] = useState<{
    state: boolean;
    action: "accept" | "reject" | "";
  }>({
    state: false,
    action: "",
  });

  async function clientMarkPostulation(
    postulation: PostulationWithUser,
    mode: boolean
  ) {
    const action = mode ? "accept" : "reject";
    setLoadingMarkPostulation({
      state: true,
      action,
    });

    try {
      await markPostulation(postulation, mode);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMarkPostulation({
        state: false,
        action: "",
      });
    }
  }

  return (
    <Modal
      isOpen={!!postulation}
      isDismissable
      size="3xl"
      classNames={{
        header: "border-b border-gray-200",
      }}
      placement="center"
      onClose={onClose}
    >
      {postulation && (
        <ModalContent>
          <ModalHeader className="justify-center">
            <User
              avatarProps={{
                radius: "lg",
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              description={postulation.student.correo}
              name={postulation.student.nombre}
            >
              {postulation.student.correo}
            </User>
          </ModalHeader>

          <ModalBody className="sm:flex-row sm:pt-0">
            <p className="mt-2">{postulation.descripcion}</p>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cerrar
            </Button>

            <Button
              variant="ghost"
              color="success"
              onPress={() => clientMarkPostulation(postulation, true)}
              isDisabled={postulation.aceptada || loadingMarkPostulation.state}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMarkPostulation.state &&
                loadingMarkPostulation.action === "accept" && (
                  <Spinner size="sm" color="success" />
                )}
              Aceptar
            </Button>

            <Button
              variant="ghost"
              color="danger"
              onPress={() => clientMarkPostulation(postulation, false)}
              isDisabled={
                postulation.aceptada === false || loadingMarkPostulation.state
              }
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMarkPostulation.state &&
                loadingMarkPostulation.action === "reject" && (
                  <Spinner size="sm" color="danger" />
                )}
              Rechazar
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
