"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { DataTableType } from "@/lib/components/table/DataTable";
const DataTable = dynamic(() => import("@/lib/components/table/DataTable"), {
  ssr: false,
}) as DataTableType;

import {
  TableRow,
  TableCell,
  Button,
  Chip,
  Tooltip,
  User,
  Selection,
} from "@nextui-org/react";
import { IconBan, IconCheck, IconEye } from "@tabler/icons-react";

import {
  columns,
  descriptionsMap,
  initialVisibleColumns,
  labelsMap,
  statusPostulations,
} from "./constants";

import { cn } from "@/lib/utils/classNames";
import { PostulationWithUser } from "@/lib/models/Postulation";
import {
  markPostulationStatus,
  markPostulationsStudentStatus,
} from "@/lib/actions/postulation.service";
import { useToast } from "@/lib/components/ui/toast";
import { VacancySubjectName } from "@/lib/models/Vacancy";
import ModalPostulation from "../modal/ModalPostulation";

interface Props {
  postulations: PostulationWithUser[];
  vacancy: VacancySubjectName;
}

export default function PostulationsTable({ postulations, vacancy }: Props) {
  const [postulationModal, setPostulationModal] =
    useState<PostulationWithUser | null>(null);
  const [selectedAction, setSelectedAction] = useState(new Set(["aceptar"]));

  const { showToast } = useToast();

  const mode = Array.from(selectedAction)[0] as "aceptar" | "rechazar";
  const color = mode === "aceptar" ? "success" : "danger";

  async function markSelectedPostulations(selectedKeys: Selection) {
    try {
      const studentsIds: number[] = [];
      const nameStudents: string[] = [];
      for (const key of Array.from(selectedKeys)) {
        const [idString, id_vacante] = (key as string).split("-");
        const id = Number(idString);

        studentsIds.push(id);

        const postulation = postulations.find(
          (postulation) => postulation.id_estudiante === id
        );

        if (!postulation)
          throw new Error(`Estudiante con carnet ${id} no fue encontrado.`);

        const name = postulation.student.nombre;

        if (mode === "aceptar" && postulation.aceptada) {
          throw new Error(
            `El estudiante ${name} ya ha sido aceptado, por favor desmárquelo`
          );
        } else if (mode == "rechazar" && postulation.aceptada === false) {
          throw new Error(
            `El estudiante ${name} ya ha sido descalaficado, por favor desmárquelo`
          );
        }

        nameStudents.push(name);
      }

      const id_vacante = vacancy.id;

      await markPostulationsStudentStatus(
        studentsIds,
        id_vacante,
        mode === "aceptar" ? true : false
      );

      showToast({
        title: "Éxito",
        description:
          mode === "aceptar"
            ? `Se aceptó`
            : `Se descalificó` + ` a ${nameStudents.join(", ")} exitosamente`,
        variant: "success",
      });
    } catch (error: any) {
      showToast({
        title: "Error actualizando",
        description: error.message,
        variant: "error",
      });
    }
  }

  async function markPostulation(
    postulation: PostulationWithUser,
    mode: boolean
  ) {
    try {
      await markPostulationStatus(
        postulation.id_estudiante,
        postulation.id_vacante,
        mode
      );

      const description = mode
        ? `Se aceptó a ${postulation.student.nombre} exitosamente`
        : `Se descalificó a ${postulation.student.nombre} exitosamente`;

      showToast({
        title: "Éxito",
        description,
        variant: "success",
      });
    } catch (error) {
      const description = mode
        ? `No se pudo aceptar al estudiante ${postulation.student.nombre}`
        : `No se pudo descalificar al estudiante ${postulation.student.nombre}`;

      showToast({
        title: "Error",
        description,
        variant: "error",
      });
    }
  }

  return (
    <>
      <DataTable
        aria-label="Example table with custom cells, pagination and sorting"
        data={postulations}
        inputFilter={{
          keyFilter: "student.nombre",
          placeholder: "Buscar estudiante",
        }}
        selectionButtonDropdownProps={{
          onPress: markSelectedPostulations,
          labelsMap,
          descriptionsMap,
          selectedOption: selectedAction,
          setSelectedOption: setSelectedAction,
          buttonGroupProps: {
            color,
          },
          buttonProps: {
            startContent: mode === "aceptar" ? <IconCheck /> : <IconBan />,
          },
        }}
        statusDropdownProps={{
          title: "Estatus",
          dropdownMenuProps: {
            "aria-label": "Table Status",
          },
        }}
        columnsDropdownProps={{
          title: "Columnas",
          dropdownMenuProps: {
            "aria-label": "Table Columns",
          },
        }}
        statusOptions={statusPostulations}
        keyStatus="aceptada"
        defaultStatus={new Set(["null"])}
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        color={color}
        emptyContent="No hay estudiantes postulados aún"
      >
        {(postulation) => (
          <TableRow
            key={`${postulation.id_estudiante}-${postulation.id_vacante}`}
          >
            {(columnKey) => (
              <TableCell
                className={cn(
                  ["grade", "actions"].includes(columnKey as string) &&
                    "text-center"
                )}
              >
                {renderCell(
                  postulation,
                  columnKey,
                  setPostulationModal,
                  markPostulation
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </DataTable>

      <ModalPostulation
        vacancy={vacancy}
        postulation={postulationModal}
        onClose={() => setPostulationModal(null)}
        markPostulation={markPostulation}
      />
    </>
  );
}

const renderCell = (
  item: PostulationWithUser,
  columnKey: React.Key,
  setPostulationModal: (postulation: PostulationWithUser) => void,
  markPostulation: (postulation: PostulationWithUser, mode: boolean) => void
) => {
  switch (columnKey) {
    case "student":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          description={item.student.correo}
          name={item.student.nombre}
        >
          {item.student.correo}
        </User>
      );
    case "career":
      // TODO - Incluir carrera
      return (
        <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize"></p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {item.team}
          </p> */}
        </div>
      );
    case "date":
      const formatedDate = new Date(item.createdAt).toLocaleDateString();

      return formatedDate;
    case "grade":
      return <div className="mr-3">{item.nota}</div>;

    case "status":
      return (
        <Chip
          className="capitalize"
          color={item.aceptada ? "success" : "danger"}
          size="sm"
          variant="flat"
        >
          {item.aceptada ? "aceptada" : "rechazada"}
        </Chip>
      );
    case "actions":
      return (
        <div className="flex flex-row justify-center gap-2">
          <Tooltip content={`Ver detalles de ${item.student.nombre}`}>
            <Button
              isIconOnly
              variant="light"
              className="text-lg active:opacity-50"
              onClick={() => setPostulationModal(item)}
            >
              <IconEye />
            </Button>
          </Tooltip>

          <Tooltip color="success" content={`Aceptar a ${item.student.nombre}`}>
            <Button
              isIconOnly
              variant="light"
              color="success"
              isDisabled={item.aceptada === true}
              className="text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onPress={() => markPostulation(item, true)}
            >
              <IconCheck />
            </Button>
          </Tooltip>

          <Tooltip
            color="danger"
            content={`Descalificar a ${item.student.nombre}`}
          >
            <Button
              isIconOnly
              variant="light"
              color="danger"
              isDisabled={item.aceptada === false}
              className="text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onPress={() => markPostulation(item, false)}
            >
              <IconBan />
            </Button>
          </Tooltip>
        </div>
      );
    default:
      return null;
  }
};
