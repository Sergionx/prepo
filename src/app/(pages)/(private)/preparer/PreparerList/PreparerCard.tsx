import { getAllPreparers } from "@/lib/actions/preparer.service";
import { Preparador } from "@/lib/models/User";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Tooltip,
  cn,
} from "@nextui-org/react";
import Image from "next/image";

interface Props {
  preparador: Preparador;
}

export default function PreparerCard({ preparador }: Props) {
  return (
    <Card className="">
      <CardHeader>
        <h2 className="text-2xl font-medium">{preparador.nombre}</h2>
      </CardHeader>

      <CardBody>
        <Image
          src={preparador.foto}
          alt={preparador.nombre}
          width={100}
          height={100}
          className="rounded-full self-center"
        />
      </CardBody>

      <CardFooter className="flex flex-wrap justify-center gap-2">
        {preparador.materias.map((materia, index) => (
          <Chip key={index} color="primary">
            {materia}
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
}
