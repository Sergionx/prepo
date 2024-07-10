import { getVacancies_SubjectName } from "@/lib/actions/vacancies.service";
import React from "react";
import VacanciesTable from "./table";
import { getAllSubjects } from "@/lib/actions/subjects.service";

export default async function VacanciesList() {
  // TODO - Hacer fetch de vacantes en base al departamento del coordinador
  const [vancancies, subjects] = await Promise.all([
    getVacancies_SubjectName(),
    getAllSubjects(),
  ]);

  //  await new Promise((resolve) => {
  //     setTimeout(resolve, 100000);
  //   })

  return (
    <div className="p-16">
      <VacanciesTable vacancies={vancancies} subjects={subjects} />
    </div>
  );
}
