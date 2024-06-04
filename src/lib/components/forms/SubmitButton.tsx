"use client";

import { cn } from "@/lib/utils/classNames";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

interface Props {
  text?: string;
  isLoading: boolean;
  className?: string;
}
export default function SubmitButton({
  text = "Crear",
  isLoading,
  className,
}: Props) {
  return (
    <Button
      type="submit"
      color="primary"
      className={cn(className)}
      disabled={isLoading}
    >
      {isLoading && <Spinner color="default" size="sm" />}

      {isLoading ? "Creando..." : text}
    </Button>
  );
}
