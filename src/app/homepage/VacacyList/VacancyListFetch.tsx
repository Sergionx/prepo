import React from "react";
import { getVacancies } from "./action";
import VacancyList from "./VacancyList";

export default async function VacancyListFetch() {
  const vacancies = await getVacancies();

  return <VacancyList vacancies={vacancies} />;
}
