import { getPostulationsByVacancyId } from "@/lib/actions/postulation.service";

import PostulationsTable from "./PostulationsTable";

interface Props {
  params: { id: string };
}

export default async function Postulations({ params: { id } }: Props) {
  try {
    const postulations = await getPostulationsByVacancyId(parseInt(id));

    console.log(postulations);
    return (
      <div className="p-16">
        <PostulationsTable postulations={postulations} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>ERooooooooooooor</div>;
  }
}
