"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import { UserType } from "@/lib/models/User";

export default function OnlyCoordinatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  if (user.tipo_usuario !== UserType.COORDINATOR) {
    router.push("/login");
    return null;
  }

  return <div>{children}</div>;
}
