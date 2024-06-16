import React from "react";
import VacancyList from "./VacancyList";
import { getVacancies_SubjectName } from "@/lib/actions/vacancies.service";

export default async function VacancyListFetch() {
  const vacancies = await getVacancies_SubjectName();

  return <VacancyList vacancies={vacancies} />;
}
