import React from "react";
import { TextAreaProps, Textarea } from "@nextui-org/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils/classNames";

interface Props<T extends FieldValues> extends TextAreaProps {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

export default function TextareaControl<T extends FieldValues>({
  name,
  label,
  control,
  className,
  ...props
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ formState, fieldState, field }) => (
        <Textarea
          label={label}
          {...props}
          {...field}
          disabled={formState.isSubmitting || field.disabled || props.disabled}
          isInvalid={
            fieldState.invalid && (formState.isSubmitted || fieldState.isDirty)
          }
          errorMessage={fieldState.error?.message}
          className={cn("disabled:opacity-50", className)}
        />
      )}
    ></Controller>
  );
}
