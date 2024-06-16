import { BackgroundGradientAnimation } from "@/lib/components/ui/background-gradient-animation";
import VacantForm from "./VacantForm/VacantForm";
import { getAllSubjects } from "@/lib/actions/subjects.service";

export default async function Home() {
  const subjects = await getAllSubjects();

  return (
    <BackgroundGradientAnimation
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
      <VacantForm subjects={subjects} />
    </BackgroundGradientAnimation>
  );
}
