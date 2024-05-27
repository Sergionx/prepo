import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

interface Props {
  name: string;
  errors?: FieldErrors<any>;
}

export default function ErrorMessages(props: Props) {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ messages }) => (
        <div className="flex flex-col">
          {messages &&
            Object.entries(messages).map(([type, message]) => (
              <small key={type} role="alert" className="mt-2 text-error">
                * {message}
              </small>
            ))}
        </div>
      )}
    />
  );
}
