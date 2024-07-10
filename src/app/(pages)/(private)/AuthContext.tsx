"use client";
import { BaseUser } from "@/lib/models/User";
import React, { createContext, useContext, useMemo } from "react";

interface IAuthContext {
  user: BaseUser | null;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({
  children,
  baseUser,
}: {
  baseUser: BaseUser | null;
  children: React.ReactNode;
}) {
  const user = useMemo(() => baseUser, [baseUser]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
