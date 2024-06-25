"use client";

import dynamic from "next/dynamic";
import type { DataTableType } from "@/lib/components/table/DataTable";
const DataTable = dynamic(() => import("@/lib/components/table/DataTable"), {
  ssr: false,
}) as DataTableType;

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
import { cn } from "@/lib/utils/classNames";
import { useState } from "react";
import {
  columns,
  descriptionsMap,
  initialVisibleColumns,
  labelsMap,
  statusPostulations,
} from "./constants";

export default function PostulationsTable({
  postulations,
}: {
  postulations: PostulationWithUser[];
}) {
  const [selectedAction, setSelectedAction] = useState(new Set(["aceptar"]));

  const mode = Array.from(selectedAction)[0];
  const color = mode === "aceptar" ? "success" : "danger";

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
      defaultStatus={new Set(["true"])}
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
