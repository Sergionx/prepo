import { useRouter } from "next/router";
import { emptyForm } from "../VacancyList/ModalPostulationForm/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/(auth_pages)/signup/schema";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import { getFormData } from "@/lib/utils/forms";
import { signup } from "@/app/(auth_pages)/signup/action";
import InputControl from "@/lib/components/forms/controls/InputControl";
import SelectControl from "@/lib/components/forms/controls/SelectControl";
import SubmitButton from "@/lib/components/forms/SubmitButton";

export default function SignUpForm() {
    const router = useRouter();
  
    const { control, formState, handleSubmit, watch } = useForm({
      defaultValues: emptyForm,
      mode: "all",
      resolver: zodResolver(signupSchema),
    });
  
    const { onSubmit } = useFormSubmit({
      mode: "add",
      addAction: async (data) => {
        const formData = getFormData(data);
  
        return await signup(formData);
      },
  
      onSucess: () => {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      },
      formState,
    });
  
    const isCoordinator = Number(watch("type")) === USER_TYPE.COORDINATOR.id;
    console.log(isCoordinator, watch("type"));
    return (
      <form
        className="grid gap-x-4 py-6 gap-y-10 grid-cols-2 justify-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputControl
          label="Name"
          control={control}
          name="name"
          className="max-w-xs"
        />
  
        <InputControl
          label="Lastname"
          control={control}
          name="lastname"
          type="lastname"
          className="max-w-xs"
        />
  
        <InputControl
          label="Email"
          control={control}
          name="email"
          type="email"
          defaultValue="aaaa@correo.unimet.edu.ve"
          className="max-w-xs"
        />
        <InputControl
          label="Contraseña"
          control={control}
          name="password"
          type="password"
          className="max-w-xs"
        />
  
        <InputControl
          label="Carnet"
          control={control}
          name="id"
          type="id"
          className="max-w-xs"
        />
  
        <SelectControl
          label="Tipo de usuario"
          control={control}
          name="type"
          items={usuarios}
          className="max-w-xs text-black"
        />
        {isCoordinator && (
          <SelectControl
            label="Campo adicional"
            control={control}
            items={departamentos}
            name="departamento"
            className="max-w-xs text-black"
          />
        )}
  
        <SubmitButton
          text="Crear cuenta"
          loadingText="Creando cuenta"
          isLoading={formState.isLoading || formState.isSubmitting}
          className="col-span-2 w-[50%] justify-self-center"
        ></SubmitButton>
      </form>
    );
  }