import { BackgroundGradientAnimation } from "@/lib/components/ui/background-gradient-animation";
import VacantForm from "./VacantForm/VacantForm";
import { getAllSubjects } from "@/lib/actions/subjects.service";

export default async function Home() {
  const subjects = await getAllSubjects();

  return (
    <BackgroundGradientAnimation
      containerClassName=""
      className="flex h-full flex-col items-center justify-center p-24"
    >
      <main className="z-10">
        <VacantForm subjects={subjects} />
      </main>
    </BackgroundGradientAnimation>
  );
}
