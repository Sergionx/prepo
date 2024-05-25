import Image from "next/image";
import VacantForm from "./VacantForm/VacantForm";

export default function Home() {
  return (
    <main
      className="flex  flex-col items-center justify-between p-24
      bg-gradient-to-tr from-zinc-900  to-blue-800"
    >
      <VacantForm />
    </main>
  );
}
