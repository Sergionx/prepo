"use client";
import dynamic from "next/dynamic";
import type { CustomDataTableType } from "@/lib/components/table/CustomDataTable";
const CustomDataTable = dynamic(
  () => import("@/lib/components/table/CustomDataTable"),
  {
    ssr: false,
  }
) as CustomDataTableType;

import { useEffect, useState } from "react";
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
  useDisclosure,
} from "@nextui-org/react";
import { IconEye, IconTrash, IconSearch } from "@tabler/icons-react";
import { statusVacancies, initialVisibleColumns, columns } from "./constants";
import DropdownTable from "@/lib/components/table/DropdownTable";
import { Subject } from "@/lib/models/Subject";
import ModalVacantForm from "./ModalVacantForm/ModalVacantForm";

interface Props {
  vacancies: VacancySubjectName[];
  subjects: Subject[];
}

export default function VacanciesTable({ vacancies, subjects }: Props) {
  const [vacantModal, setVacantModal] = useState<VacancySubjectName | null>(
    null
  );

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    if (vacantModal) {
      onOpen();
    }
  }, [vacantModal]);

  const { showToast } = useToast();

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
        statusOptions={statusVacancies}
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
                onClear={onClear}
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

                <Button color="secondary" variant="solid" onPress={onOpen}>
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
                {renderCell(vacancy, columnKey, setVacantModal)}
              </TableCell>
            )}
          </TableRow>
        )}
      </CustomDataTable>

      <ModalVacantForm
        vacancy={vacantModal}
        subjects={subjects}
        isOpen={isOpen}
        onClose={onClose}
        afterClose={() => setVacantModal(null)}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

const renderCell = (
  item: VacancySubjectName,
  columnKey: React.Key,
  setVacantModal: (vacant: VacancySubjectName | null) => void
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
              onPress={() => setVacantModal(item)}
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
