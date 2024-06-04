"use client";

import Image from "next/image";
import { CardBody, Card } from "@nextui-org/react";

import { Vacancy } from "@/lib/models/Vacancy";
import ModalVacant from "./ModalVacant";
import { useState } from "react";
import VacancyCard from "./VacancyCard";

export default function VacancyList({ vacancies }: { vacancies: Vacancy[] }) {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* <Card isPressable>
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
        </Card> */}

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
