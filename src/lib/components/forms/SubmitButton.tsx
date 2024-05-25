"use client";

import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

interface Props {
  text?: string;
  isLoading: boolean;
}
export default function SubmitButton({ text = "Crear", isLoading }: Props) {
  return (
    <Button
      type="submit"
      color="primary"
      className="ml-auto"
      disabled={isLoading}
    >
      {isLoading && <Spinner color="default" size="sm" />}

      {isLoading ? "Creando..." : text}
    </Button>
  );
}
