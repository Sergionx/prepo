import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";
import React from "react";
import { FieldValues, Path, Control, Controller } from "react-hook-form";

interface Item {
  value: string | number;
  label: string;
}

interface Props<T extends FieldValues>
  extends Omit<AutocompleteProps, "children"> {
  name: Path<T>;
  control: Control<T>;
  items: Item[];
}

// TODO - Add requireda los controles
export default function AutoCompleteControl<T extends FieldValues>({
  name,
  label,
  control,
  ...props
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ formState, fieldState, field }) => (
        <Autocomplete
          label={label}
          disabled={formState.isSubmitting || field.disabled}
          {...props}
          {...field}
          isInvalid={
            fieldState.invalid && (formState.isSubmitted || fieldState.isDirty)
          }
          errorMessage={fieldState.error?.message}
          onChange={(e) => {
            const value =
              props.type === "number" ? Number(e.target.value) : e.target.value;
            console.log({ value });
            field.onChange(value);
          }}
          selectedKey={field.value}
          onSelectionChange={field.onChange}
        >
          {props.items.map((item) => (
            <AutocompleteItem key={item.value} value={item.value}>
              {item.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
    ></Controller>
  );
}
