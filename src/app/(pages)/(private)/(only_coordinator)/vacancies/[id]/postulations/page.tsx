import { getPostulationsByVacancyId } from "@/lib/actions/postulation.service";

import PostulationsTable from "./PostulationsTable";
import { getVacancies_SubjectName_ById } from "@/lib/actions/vacancies.service";

interface Props {
  params: { id: string };
}

export default async function Postulations({ params: { id } }: Props) {
  try {
    const numberId = parseInt(id);

    const [postulations, vacancy] = await Promise.all([
      getPostulationsByVacancyId(numberId),
      getVacancies_SubjectName_ById(numberId),
    ]);
    console.log;

    return (
      <div className="p-16">
        <h1 className="text-2xl font-bold mb-2">Postulaciones</h1>
        <h2 className="text-xl font-semibold mb-2">{vacancy.subject.nombre}</h2>

        <p className="text-lg mb-2">{vacancy.description}</p>
        <p className="mb-6">Puestos restantes: {vacancy.preparadores_restantes}</p>

        <PostulationsTable postulations={postulations} vacancy={vacancy} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>ERooooooooooooor</div>;
  }
}
