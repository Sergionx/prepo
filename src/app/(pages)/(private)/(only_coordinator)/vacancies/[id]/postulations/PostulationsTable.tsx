"use client";

import dynamic from "next/dynamic";
import type { DataTableType } from "@/lib/components/table/DataTable";
const DataTable = dynamic(() => import("@/lib/components/table/DataTable"), {
  ssr: false,
}) as DataTableType;

import { StatusOption } from "@/lib/hooks/filter/useStatusFilter";

import { PostulationWithUser } from "@/lib/models/Postulation";
import {
  TableRow,
  TableCell,
  Button,
  Chip,
  Tooltip,
  User,
} from "@nextui-org/react";
import { IconBan, IconCheck, IconEye } from "@tabler/icons-react";
import { Column } from "@/lib/hooks/table/useSelectColumns-Table";
import { cn } from "@/lib/utils/classNames";
import { useState } from "react";

const statusPostulations: StatusOption[] = [
  { name: "Aceptada", uid: "aceptada" },
  { name: "Rechazada", uid: "rechazada" },
];
const initialVisibleColumns = ["student", "date", "grade", "actions"];

const columns: Column[] = [
  {
    name: "Estudiante",
    uid: "student",
  },
  {
    name: "Estado",
    uid: "status",
  },
  {
    name: "Nota",
    uid: "grade",
    sortable: true,
    align: "center",
  },
  {
    name: "Fecha",
    uid: "date",
    sortable: true,
  },
  {
    name: "Acciones",
    uid: "actions",
    align: "center",
  },
];

const descriptionsMap = {
  aceptar: "Acepta varias postulaciones a la vez",
  rechazar: "Rechaza varias postulaciones a la vez",
};

const labelsMap = {
  aceptar: "Aceptar seleccionados",
  rechazar: "Rechazar seleccionados",
};

export default function PostulationsTable({
  postulations,
}: {
  postulations: PostulationWithUser[];
}) {
  const [selectedAction, setSelectedAction] = useState(new Set(["aceptar"]));

  const mode = Array.from(selectedAction)[0];
  const color = mode === "aceptar" ? "success" : "danger";

  // TODO - separar props de datatable para cada hook
  // TODO - Crear prop para filtrar por default los estados activo
  return (
    <DataTable
      aria-label="Example table with custom cells, pagination and sorting"
      data={postulations}
      inputFilter={{
        keyFilter: "student.nombre",
        placeholder: "Buscar estudiante",
      }}
      selectionButtonDropdownProps={{
        onPress: (selectedKeys) => {
          console.log(selectedKeys);
        },
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
      statusOptions={statusPostulations}
      keyStatus="aceptada"
      initialVisibleColumns={initialVisibleColumns}
      columns={columns}
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      color={color}
      emptyContent="No hay estudiantes postulados aún"
      // topContent={
      //   <ButtonDropdown
      //     labelsMap={labelsMap}
      //     descriptionsMap={descriptionsMap}
      //     selectedOption={selectedAction}
      //     setSelectedOption={setSelectedAction}
      //     buttonGroupProps={{
      //       color,
      //     }}
      //   />
      // }
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
              {renderCell(postulation, columnKey)}
            </TableCell>
          )}
        </TableRow>
      )}
    </DataTable>
  );
}

const renderCell = (item: PostulationWithUser, columnKey: React.Key) => {
  switch (columnKey) {
    case "student":
      console.log(item);
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
        <div className="flex-row gap-2">
          <Tooltip content={`Ver detalles de ${item.student.nombre}`}>
            <Button
              isIconOnly
              variant="light"
              className="text-lg active:opacity-50"
            >
              <IconEye />
            </Button>
          </Tooltip>

          <Tooltip color="success" content={`Aceptar a ${item.student.nombre}`}>
            <Button
              isIconOnly
              variant="light"
              color="success"
              className="text-lg active:opacity-50"
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
              className="text-lg active:opacity-50"
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
