import { BaseUser } from "@/lib/models/User";
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
  preparador: BaseUser;
  onPress: (preparador: BaseUser) => void;
}

export default function Preparador({ preparador, onPress }: Props) {
  return (
    <Card
      isPressable
      onPress={() => {
        onPress(preparador);
      }}
      className="h-[300px]"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <h3 className="text-black font-medium text-2xl pr-4">
          {preparador.nombre}
        </h3>

        {/* <Tooltip
          content={vacancy.abierto ? "Vacante abierta" : "Vacante cerrada"}
        >
          <span
            className={cn(
              "absolute top-2 right-2 rounded-full h-3 w-3",
              vacancy.abierto ? "bg-green-500" : "bg-red-500"
            )}
          />
        </Tooltip> */}
      </CardHeader>
      <CardBody>
        {/* <Image
          alt={vacancy.id_materia}
          className="w-full object-cover rounded-t-lg"
          src="/facultad_ciencias.jpg"
          fill
        /> */}
      </CardBody>

      <CardFooter className="bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <p className="text-gray-500 line-clamp-2">{preparador.nombre}</p>
      </CardFooter>
    </Card>
  );
}
