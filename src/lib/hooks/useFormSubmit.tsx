import { useRouter } from "next/navigation";
import {
  DeepMap,
  DeepPartial,
  FieldValues,
  FormState,
  SubmitHandler,
} from "react-hook-form";
import { MessageNoId, useToast } from "@/lib/components/ui/toast";

interface Props<T extends FieldValues> {
  mode: "add" | "edit";
  addAction?: (data: T) => Promise<string | null>;
  editAction?: (data: Partial<T>) => Promise<string | null>;
  onSucess?: () => void;
  formState: FormState<T>;
}

export default function useFormSubmit<T extends FieldValues>({
  mode,
  addAction,
  editAction,
  formState,
  onSucess,
}: Props<T>) {
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<T> = async (data) => {
    const message: MessageNoId = {
      title: "¡Éxito!",
      // variant: "success"
    };

    console.log(
      "onSubmit",
      data,
      formState.isSubmitting,
      formState.isValid,
      formState.isDirty,
      formState.errors
    );

    if (
      formState.isSubmitting ||
      // !formState.isValid ||
      (mode === "edit" && !formState.isDirty)
    ) {
      return;
    }

    try {
      switch (mode) {
        case "add":
          if (addAction) {
            const description = await addAction(data);
            debugger;
            // toastOptions.description = description;
          }

          break;

        case "edit":
          const { dirtyFields } = formState;
          const toUpdate = getTouchedFields(data, dirtyFields);

          if (editAction) {
            const description = await editAction(toUpdate);
            // toastOptions.description = description;
          }
          break;
      }

      showToast(message);
      // toast(toastOptions);

      onSucess?.();
    } catch (error: any) {
      console.log({ error });
      showToast({
        title: "¡Error!",
        description: error.message,
        // variant: "error"
      });
    }
  };

  function getTouchedFields<T>(
    data: T,
    dirty: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>
  ): Partial<T> {
    let result: Partial<T> = {};

    for (let key in dirty) {
      if (dirty[key]) {
        result[key as keyof T] = data[key as keyof T];
      }
    }

    return result;
  }

  return {
    onSubmit,
  };
}
