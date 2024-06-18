// app/providers.tsx
"use client";

import { ToastProvider } from "@/lib/components/ui/toast";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ToastProvider>{children}</ToastProvider>
    </NextUIProvider>
  );
}
