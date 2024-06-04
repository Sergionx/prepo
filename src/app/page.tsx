import Image from "next/image";
import VacantForm from "./VacantForm/VacantForm";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24
      bg-gradient-to-tr from-zinc-900  to-blue-800"
    >
      <VacantForm />
    </main>
  );
}
