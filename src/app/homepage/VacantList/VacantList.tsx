import Image from "next/image";
import { CardBody, Card } from "@nextui-org/react";

import { getVacancies } from "./action";
import { Vacancy } from "@/lib/models/Vacancy";

export default async function VacantList() {
  const vacancies = await getVacancies();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card isPressable>
        <Image
          alt="Facultad de Ingenieria"
          className="object-cover rounded-t-lg"
          height="300"
          src="/facultad_ing.png"
          width="400"
        />
        <CardBody>
          <h3 className="text-lg font-semibold mb-2">
            Algoritmos y Programacion
          </h3>
          <p className="text-gray-500">Conoce tus preparadores</p>
        </CardBody>
      </Card>

      <Card isPressable>
        <Image
          alt="Facultad de Ciencias"
          className="object-cover rounded-t-lg"
          height="300"
          src="/facultad_ciencias.jpg"
          width="400"
        />
        <CardBody>
          <h3 className="text-lg font-semibold mb-2">Psicopatologia I</h3>
          <p className="text-gray-500">Conoce a tus preparadores</p>
        </CardBody>
      </Card>

      <Card isPressable>
        <Image
          alt="Facultad de Ingenieria"
          className="object-cover rounded-t-lg"
          height="300"
          src="/facultad_ing.png"
          width="400"
        />
        <CardBody>
          <h3 className="text-lg font-semibold mb-2">Fisica II</h3>
          <p className="text-gray-500">Conoce a tus preparadores</p>
        </CardBody>
      </Card>

      {vacancies.map((vacancy) => (
        <VacantCard key={vacancy.id} vacancy={vacancy} />
      ))}
    </div>
  );
}

function VacantCard({ vacancy }: { vacancy: Vacancy }) {
  return (
    <Card isPressable>
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
