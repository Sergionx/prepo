import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";
import { AuthProvider } from "./AuthContext";
import { getUserByEmail } from "@/lib/actions/user.service";

export default async function PrivateLayoutexport({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const user = await getUserByEmail(data.user.email ?? "");

  return <AuthProvider baseUser={user}>{children}</AuthProvider>;
}
