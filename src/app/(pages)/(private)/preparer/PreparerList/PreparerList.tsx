import { Card } from "@nextui-org/react";
import { Preparador } from "@/lib/models/User";
import PreparerCard from "./PreparerCard";

export default function PreparerList({
  preparadores,
}: {
  preparadores: Preparador[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {preparadores.map((preparador, index) => (
        <PreparerCard preparador={preparador} key={index} />
      ))}
    </div>
  );
}
