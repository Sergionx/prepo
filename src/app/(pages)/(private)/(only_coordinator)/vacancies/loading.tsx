"use client";
import CustomDataTable from "@/lib/components/table/CustomDataTable";
import { StatusOption } from "@/lib/hooks/filter/useStatusFilter";
import { Column } from "@/lib/hooks/table/useSelectColumns-Table";
import {
  TableRow,
  TableCell,
  cn,
  Skeleton,
  Button,
  Input,
  Pagination,
} from "@nextui-org/react";
import { IconCheck, IconBan, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { columns, initialVisibleColumns, statusVacancies } from "./constants";
import DropdownTable from "@/lib/components/table/DropdownTable";

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

export default function LoadingTablePostulations() {
  const [selectedAction, setSelectedAction] = useState(new Set(["aceptar"]));

  const mode = Array.from(selectedAction)[0];
  const color = mode === "aceptar" ? "success" : "danger";

  return (
    <div className="p-16">
      <CustomDataTable
        aria-label="Example table with custom cells, pagination and sorting"
        data={dataMock}
        selectionMode="none"
        // @ts-ignore
        inputFilter={{
          isDisabled: true,
          placeholder: "Buscar estudiante",
        }}
        statusOptions={statusVacancies}
        // @ts-ignore
        keyStatus=""
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        emptyContent="No hay postulaciones para este departamento"
        customTopContent={({
          inputFilterValue,
          onClear,
          onSearchChange,
          statusFilter,
          setStatusFilter,
          visibleColumns,
          setVisibleColumns,
          onRowsPerPageChange,
          length,
        }) => (
          <div className="flex flex-col gap-4">
            <section className="flex flex-wrap justify-between gap-3 items-end">
              <Input
                isClearable
                startContent={<IconSearch />}
                value={inputFilterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
                placeholder="Buscar Materia"
                className="w-full max-w-[300px] disabled:opacity-50"
              />
              <div className="flex gap-3">
                <DropdownTable
                  selectedKeys={statusFilter}
                  onSelectionChange={setStatusFilter}
                  options={statusVacancies}
                  title="Estatus"
                  dropdownMenuProps={{
                    "aria-label": "Table Status",
                  }}
                />

                <DropdownTable
                  selectedKeys={visibleColumns}
                  onSelectionChange={setVisibleColumns}
                  options={columns}
                  title="Columnas"
                  dropdownMenuProps={{
                    "aria-label": "Table Columns",
                  }}
                />

                <Button color="secondary" variant="solid">
                  Crear Vacante
                </Button>
              </div>
            </section>

            <section className="flex justify-between items-center">
              <span className="text-default-400 text-small">
                Loading vacancies...
              </span>

              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </section>
          </div>
        )}
        customBotContent={({
          page,
          pages,
          setPage,
          onPreviousPage,
          onNextPage,
        }) => (
          <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
            <div className="hidden sm:flex w-1/3 justify-end gap-2">
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}
              >
                Anterior
              </Button>
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onNextPage}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
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
      </CustomDataTable>
    </div>
  );
}

const renderCell = (item: any, columnKey: React.Key) => {
  switch (columnKey) {
    case "actions":
      return (
        <div className="flex flex-row gap-2">
          <Skeleton className="w-10 h-10 rounded-medium" />
          <Skeleton className="w-10 h-10 rounded-medium" />
        </div>
      );

    default:
      return <Skeleton className="w-full h-4 rounded-full" />;
  }
};
