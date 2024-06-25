"use client";
import DataTable from "@/lib/components/table/DataTable";
import { StatusOption } from "@/lib/hooks/filter/useStatusFilter";
import { Column } from "@/lib/hooks/table/useSelectColumns-Table";
import { TableRow, TableCell, cn, Skeleton } from "@nextui-org/react";
import { IconCheck, IconBan } from "@tabler/icons-react";
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

const dataMock = [
  {
    key: 1,
  },
  {
    key: 2,
  },
  {
    key: 3,
  },
  {
    key: 4,
  },
  {
    key: 5,
  },
  {
    key: 6,
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

export default function LoadingTablePostulations() {
  const [selectedAction, setSelectedAction] = useState(new Set(["aceptar"]));

  const mode = Array.from(selectedAction)[0];
  const color = mode === "aceptar" ? "success" : "danger";

  return (
    <div className="p-16">
      <DataTable
        aria-label="Example table with custom cells, pagination and sorting"
        data={dataMock}
        // @ts-ignore
        inputFilter={{
          isDisabled: true,
          placeholder: "Buscar estudiante",
        }}
        selectionButtonDropdownProps={{
          onPress: (selectedKeys) => {},
          labelsMap,
          descriptionsMap,
          selectedOption: selectedAction,
          setSelectedOption: setSelectedAction,

          buttonGroupProps: {
            isDisabled: true,
            color,
          },

          buttonProps: {
            startContent: mode === "aceptar" ? <IconCheck /> : <IconBan />,
          },
        }}
        statusOptions={statusPostulations}
        // @ts-ignore
        keyStatus=""
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        emptyContent="No hay estudiantes postulados aún"
      >
        {(mockItem) => (
          <TableRow key={mockItem.key}>
            {(columnKey) => (
              <TableCell
                className={cn(
                  ["grade", "actions"].includes(columnKey as string) &&
                    "text-center",
                  columnKey === "actions" && "w-36"
                )}
              >
                {renderCell(mockItem, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </DataTable>
    </div>
  );
}

const renderCell = (item: any, columnKey: React.Key) => {
  switch (columnKey) {
    case "student":
      return (
        <span className="flex flex-row items-center gap-2 w-full">
          <Skeleton className="w-10 h-10 rounded-large" />

          <div className="flex flex-col gap-1 w-3/4 ">
            <Skeleton className="w-12 h-5 rounded-full" />
            <Skeleton className="w-full h-4 rounded-full" />
          </div>
        </span>
      );

    case "actions":
      return (
        <div className="flex flex-row gap-2">
          <Skeleton className="w-10 h-10 rounded-medium" />
          <Skeleton className="w-10 h-10 rounded-medium" />
          <Skeleton className="w-10 h-10 rounded-medium" />
        </div>
      );

    default:
      return <Skeleton className="w-full h-4 rounded-full" />;
  }
};
