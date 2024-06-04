import { Vacancy } from "@/lib/models/Vacancy";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

interface Props {
  vacancy: Vacancy;
  setVacancy: (vacancy: Vacancy) => void;
}

export default function VacancyCard({ vacancy, setVacancy }: Props) {
  return (
    <Card
      isPressable
      onPress={() => {
        setVacancy(vacancy);
      }}
    >
      <Image
        alt={vacancy.title}
        className="w-fulls object-cover rounded-t-lg"
        height="300"
        src="/facultad_ciencias.jpg"
        width="400"
      />
      <CardBody>
        <h3 className="text-lg font-semibold mb-2">{vacancy.title}</h3>
        <p className="text-gray-500">{vacancy.description}</p>
      </CardBody>
    </Card>
  );
}
