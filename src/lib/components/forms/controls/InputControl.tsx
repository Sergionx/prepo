import React from "react";
import { Input, InputProps } from "@nextui-org/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> extends InputProps {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

export default function InputControl<T extends FieldValues>({
  name,
  label,
  control,
  ...props
}: Props<T>) {
  const { onChange: onChangeInput } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ formState, fieldState, field }) => (
        <Input
          label={label}
          {...props}
          {...field}
          disabled={formState.isSubmitting || field.disabled || props.disabled}
          isInvalid={
            fieldState.invalid && (formState.isSubmitted || fieldState.isDirty)
          }
          errorMessage={fieldState.error?.message}
          onChange={(e) => {
            const value =
              props.type === "number" ? Number(e.target.value) : e.target.value;

            onChangeInput?.(e);
            field.onChange(value);
          }}
          className="disabled:opacity-50"
        />
      )}
    ></Controller>
  );
}
