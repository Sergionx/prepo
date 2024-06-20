"use client";

import { VacancySubjectName } from "@/lib/models/Vacancy";
import { useState } from "react";
import VacancyCard from "./VacancyCard";
import ModalPostulationForm from "./ModalPostulationForm/ModalPostulationForm";
import { Postulation } from "@/lib/models/Postulation";
import { createClient } from "@/lib/utils/supabase/client";
import { useAuth } from "@/app/(private)/AuthContext";

export default function VacancyList({
  vacancies,
}: {
  vacancies: VacancySubjectName[];
}) {
  const [vacancy, setVacancy] = useState<VacancySubjectName | null>(null);
  const [postulation, setPostulation] = useState<Postulation | null>(null);

  const { user } = useAuth();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            setVacancy={async (vacancy) => {
              if (user) {
                const postulation = await getPostulation(vacancy.id, user.id);
                setPostulation(postulation);
              }

              setVacancy(vacancy);
            }}
          />
        ))}
      </div>

      <ModalPostulationForm
        vacancy={vacancy}
        onClose={() => setVacancy(null)}
        postulation={postulation}
      />
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
