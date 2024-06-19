import Image from "next/image";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <div className="flex flex-row  min-h-screen w-full">
      <main
        className="flex flex-col justify-center gap-y-4
          p-10 md:basis-1/2 w-full"
      >
        <h1 className="text-4xl ">Prepo</h1>
        <p className="text-pretty">
          Para acceder al sistema, necesitamos la siguiente información de tu
          parte.
        </p>

        <SignUpForm />
      </main>

      <aside className="w-full basis-1/2 relative h-screen -z-[1] md:block hidden">
        <Image
          src="/unimet.jpg"
          alt="unimet"
          priority={true}
          fill
          quality={100}
          sizes="50vw"
          className="object-cover mx-lg: brightness-50 "
        />
      </aside>
    </div>
  );
}
