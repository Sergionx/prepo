"use client";

import { cn } from "@/lib/utils/classNames";
import { Button, ButtonProps } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

interface Props extends Omit<ButtonProps, "chidlren"> {
  text?: string;
  isLoading: boolean;
  loadingText?: string;
}
export default function SubmitButton({
  text = "Crear",
  isLoading,
  loadingText = "Creando...",
  className,
  disabled,
  ...props
}: Props) {
  return (
    <Button
      type="submit"
      color="primary"
      className={cn(className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Spinner color="default" size="sm" />}

      {isLoading ? loadingText : text}
    </Button>
  );
}
