import { getAllPreparers } from "@/lib/actions/preparer.service";
import { Preparador } from "@/lib/models/User";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  cn,
} from "@nextui-org/react";
import Image from "next/image";

interface Props {
  preparador: Preparador;
}

export default function PreparerCard({ preparador }: Props) {
  return (
    <div>
      <Card>
        <h2>{preparador.nombre}</h2>
        <p>Materias: {preparador.materia.join(", ")}</p>
        <Image
          src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
          alt={preparador.nombre}
          fill
        />
      </Card>
    </div>
  );
}
