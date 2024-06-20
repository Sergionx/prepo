import { cn } from "@/lib/utils/classNames";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectItem {
  label: string;
  key: string | number;
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
  className,
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
          className={cn("disabled:opacity-50", className)}
        >
          {items.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      )}
    ></Controller>
  );
}
