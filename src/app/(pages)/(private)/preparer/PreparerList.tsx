import { Card } from "@nextui-org/react";
import { Preparador } from "@/lib/models/User";
import PreparerCard from "./PreparerCard";

export default function PreparerList({
  preparadores,
}: {
  preparadores: Preparador[];
}) {
  return (
    <div>
      {preparadores.map((preparador, index) => (
        <PreparerCard preparador={preparador} />
      ))}
    </div>
  );
}
