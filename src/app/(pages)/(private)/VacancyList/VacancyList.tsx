"use client";

import { useCallback, useState } from "react";

import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Button, Input, Pagination, Spinner } from "@nextui-org/react";

import { VacancySubjectName } from "@/lib/models/Vacancy";
import VacancyCard from "./VacancyCard";
import ModalPostulationForm from "./ModalPostulationForm/ModalPostulationForm";

import { Postulation } from "@/lib/models/Postulation";
import { createClient } from "@/lib/utils/supabase/client";

import { useAuth } from "@/app/(pages)/(private)/AuthContext";
import useInputFilter from "@/lib/hooks/filter/useInputFilter";
import usePagination from "@/lib/hooks/usePagination";
import { UserType } from "@/lib/models/User";

export default function VacancyList({
  vacancies,
}: {
  vacancies: VacancySubjectName[];
}) {
  const [vacancy, setVacancy] = useState<VacancySubjectName | null>(null);
  const [postulation, setPostulation] = useState<Postulation | null>(null);
  const [loadingPostulation, setLoadingPostulation] = useState(false);

  const {
    inputFilterValue,
    filteredItems: inputFilteredItems,
    setInputFilterValue,
  } = useInputFilter({ data: vacancies, inputKeyFilter: "subject.nombre" });

  const { items, page, rowsPerPage, setRowsPerPage, setPage, pages } =
    usePagination({
      data: inputFilteredItems,
      defaultRowsPerPage: 10,
    });

  const { user } = useAuth();
  const isCoordinator = user?.tipo_usuario === UserType.COORDINATOR;

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, setPage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setInputFilterValue(value);
        setPage(1);
      } else {
        setInputFilterValue("");
      }
    },
    [setInputFilterValue, setPage]
  );

  const onClear = useCallback(() => {
    setInputFilterValue("");
    setPage(1);
  }, [setInputFilterValue, setPage]);

  return (
    <>
      {/* TODO - Filtro por departametno */}
      <header className="flex flex-col gap-4 mb-6">
        {/* REVIEW - Considerar convertirlo en un autocomplete */}
        <section className="flex justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Filtrar por materia..."
            startContent={<IconSearch />}
            value={inputFilterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          {isCoordinator && (
            <Button
              color="success"
              className="ml-auto h-auto"
              startContent={<IconPlus />}
            >
              Crear nueva vacante
            </Button>
          )}
        </section>

        <section className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {vacancies.length} vacantes en total
          </span>

          <label className="flex items-center text-default-400 text-small">
            Vacantes por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </section>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            onPress={async (vacancy) => {
              setLoadingPostulation(true);

              try {
                if (user) {
                  const postulation = await getPostulation(vacancy.id, user.id);
                  setPostulation(postulation);
                }

                setVacancy(vacancy);
              } catch (error) {
                throw error;
              } finally {
                setLoadingPostulation(false);
              }
            }}
          />
        ))}
      </div>

      <footer className="py-2 px-2 flex justify-between items-center mt-2">
        <div className="w-1/3"></div>

        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />

        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </footer>

      <ModalPostulationForm
        vacancy={vacancy}
        onClose={() => setVacancy(null)}
        postulation={postulation}
      />

      {loadingPostulation && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <Spinner color="secondary" size="lg" />
        </div>
      )}
    </>
  );
}

async function getPostulation(id_vacante: number, id_student: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Postulacion")
    .select("*")
    .eq("id_vacante", id_vacante)
    .eq("id_estudiante", id_student);

  if (error) throw error;

  const postulation = data[0] as Postulation;

  return postulation;
}
