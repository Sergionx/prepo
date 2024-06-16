"use client";

import { Vacancy, VacancySubjectName } from "@/lib/models/Vacancy";
import ModalVacant from "./ModalVacant";
import { useState } from "react";
import VacancyCard from "./VacancyCard";

export default function VacancyList({
  vacancies,
}: {
  vacancies: VacancySubjectName[];
}) {
  const [vacancy, setVacancy] = useState<VacancySubjectName | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            setVacancy={setVacancy}
          />
        ))}
      </div>

      <ModalVacant vacancy={vacancy} onClose={() => setVacancy(null)} />
    </>
  );
}
