import { cn } from "@/lib/utils/classNames";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  value?: any;
  focus?: boolean;
}

export default function FloatingLabel({
  label,
  value,
  className,
  focus,
  ...props
}: Props) {
  if (label === "Número de Teléfono") {
    console.log(value);
  }
  return (
    <label
      className={cn(
        `absolute duration-300 
        text-base font-semibold top-[0.65rem] -z-50 
        left-0 scale-90 -translate-y-9`,
        {
          "peer-focus:left-0  peer-placeholder-shown:left-4 peer-placeholder-shown:scale-100 peer-focus:scale-90 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-9":
            value === undefined,
          "left-4 scale-100 translate-y-0": value !== undefined && value === "",
          "left-0 scale-90 -translate-y-9":
            focus || (value !== undefined && value !== ""),
        },
        className
      )}
      {...props}
    >
      {label}
    </label>
  );
}
