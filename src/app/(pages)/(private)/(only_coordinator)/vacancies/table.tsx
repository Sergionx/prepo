"use client";
import dynamic from "next/dynamic";
import type { CustomDataTableType } from "@/lib/components/table/CustomDataTable";
const CustomDataTable = dynamic(
  () => import("@/lib/components/table/CustomDataTable"),
  {
    ssr: false,
  }
) as CustomDataTableType;

import { useState } from "react";
import { markPostulationStatus } from "@/lib/actions/postulation.service";
import { useToast } from "@/lib/components/ui/toast";
import { PostulationWithUser } from "@/lib/models/Postulation";
import { VacancySubjectName } from "@/lib/models/Vacancy";
import {
  Button,
  Chip,
  cn,
  TableCell,
  TableRow,
  Tooltip,
  Input,
  Pagination,
} from "@nextui-org/react";
import { IconEye, IconTrash, IconSearch } from "@tabler/icons-react";
import {
  statusPostulations,
  initialVisibleColumns,
  columns,
} from "./constants";
import DropdownTable from "@/lib/components/table/DropdownTable";

interface Props {
  vacancies: VacancySubjectName[];
}

export default function VacanciesTable({ vacancies }: Props) {
  const [postulationModal, setPostulationModal] =
    useState<PostulationWithUser | null>(null);

  // const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const { showToast } = useToast();

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

  console.log(vacancies);

  return (
    <>
      <CustomDataTable
        isHeaderSticky
        bottomContentPlacement="outside"
        // selectedKeys={selectedKeys}
        selectionMode="none"
        topContentPlacement="outside"
        // onSelectionChange={setSelectedKeys}
        aria-label="Example table with custom cells, pagination and sorting"
        data={vacancies}
        inputFilter={{
          keyFilter: "subject.nombre",
        }}
        statusOptions={statusPostulations}
        keyStatus="abierto"
        defaultStatus={new Set(["true"])}
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
                  options={statusPostulations}
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
                Total {length} users
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
        {(vacancy) => (
          <TableRow key={vacancy.id}>
            {(columnKey) => (
              <TableCell
                className={cn(
                  [
                    "created-date",
                    "updated-date",
                    "prepareers",
                    "actions",
                  ].includes(columnKey as string) && "text-center"
                )}
              >
                {renderCell(
                  vacancy,
                  columnKey,
                  setPostulationModal,
                  markPostulation
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </CustomDataTable>

      {/* <ModalPostulation
        vacancy={vacancies}
        postulation={postulationModal}
        onClose={() => setPostulationModal(null)}
        markPostulation={markPostulation}
      /> */}
    </>
  );
}

const renderCell = (
  item: VacancySubjectName,
  columnKey: React.Key,
  setPostulationModal: (postulation: PostulationWithUser) => void,
  markPostulation: (postulation: PostulationWithUser, mode: boolean) => void
) => {
  switch (columnKey) {
    case "subject":
      return item.subject.nombre;
    case "prepareers":
      return item.preparers;
    case "created-date":
      const formatedDateCreate = new Date(item.createdAt).toLocaleDateString();

      return formatedDateCreate;
    case "updated-date":
      if (!item.updatedAt) return "No se ha modificado aún";

      const formatedDateUpdate = new Date(item.updatedAt).toLocaleDateString();

      return formatedDateUpdate;

    case "status":
      return (
        <Chip
          className="capitalize"
          color={item.abierto ? "success" : "danger"}
          size="sm"
          variant="flat"
        >
          {item.abierto ? "Abierta" : "Cerrada"}
        </Chip>
      );
    case "actions":
      return (
        <div className="flex flex-row justify-center gap-2">
          <Tooltip
            content={`Ver detalles de la postulación para: ${item.subject.nombre}`}
          >
            <Button
              isIconOnly
              variant="light"
              className="text-lg active:opacity-50"
              // onClick={() => setPostulationModal(item)}
            >
              <IconEye />
            </Button>
          </Tooltip>

          <Tooltip
            color="danger"
            content={`Eliminar la postulación para: ${item.subject.nombre}`}
          >
            <Button
              isIconOnly
              variant="light"
              color="danger"
              // isDisabled={item.aceptada === false}
              className="text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              // onPress={() => markPostulation(item, false)}
            >
              <IconTrash />
            </Button>
          </Tooltip>
        </div>
      );
    default:
      return null;
  }
};
function useFilterTable(arg0: {
  data: unknown[];
  defaultStatus: any;
  statusOptions: any;
  keyStatus: any;
}): { filteredItems: any; statusFilter: any; setStatusFilter: any } {
  throw new Error("Function not implemented.");
}
