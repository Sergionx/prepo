import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectItem {
  label: string;
  key: string;
}

interface Props<T extends FieldValues> extends SelectProps {
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
  ...props
}: Props<T>) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select label={label} {...props}>
        {items.map((usuario) => (
          <SelectItem key={usuario.key}>{usuario.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
