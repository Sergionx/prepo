import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectItem {
  label: string;
  key: string;
}

interface Props<T extends FieldValues> extends Omit<SelectProps, "children"> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  items: SelectItem[];
}

export default function SelectControl<T extends FieldValues>({
  name,
  label,
  control,
  items,
  onChange,
  ...props
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ formState, fieldState, field }) => (
        <Select
          label={label}
          {...props}
          {...field}
          disabled={formState.isSubmitting || field.disabled || props.disabled}
          isInvalid={
            fieldState.invalid && (formState.isSubmitted || fieldState.isDirty)
          }
          errorMessage={fieldState.error?.message}
          selectedKeys={field.value}
          onSelectionChange={field.onChange}
        >
          {items.map((usuario) => (
            <SelectItem key={usuario.key}>{usuario.label}</SelectItem>
          ))}
        </Select>
      )}
    ></Controller>
  );
}
