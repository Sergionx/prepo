import { getVacancies_SubjectName } from "@/lib/actions/vacancies.service";
import React from "react";
import VacanciesTable from "./table";

export default async function VacanciesList() {
  // TODO - Hacer fetch de vacantes en base al departametno
  const vancancies = await getVacancies_SubjectName();
  return (
    <div className="p-16">
      <VacanciesTable vacancies={vancancies} />
    </div>
  );
}
