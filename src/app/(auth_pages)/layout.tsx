import { BackgroundGradientAnimation } from "@/lib/components/ui/background-gradient-animation";

import Image from "next/image";
import UnimetImage from "@public/unimet.jpg";

export default function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <BackgroundGradientAnimation
        containerClassName="lg:basis-1/2"
        className="text-white"
      >
        <main
          className="flex flex-col justify-center gap-y-4 
            absolute p-10 h-full w-full z-10"
        >
          {children}
        </main>
      </BackgroundGradientAnimation>

      <aside className="w-full lg:basis-1/2 relative h-screen -z-[1] lg:block hidden">
        <Image
          src={UnimetImage}
          alt="unimet"
          priority={true}
          fill
          quality={100}
          sizes="50vw"
          placeholder="blur"
          className="object-cover mx-lg: brightness-50 "
        />
      </aside>
    </div>
  );
}
