"use client";
import { createUserService } from "@/lib/actions/user.service";
import SubmitButton from "@/lib/components/forms/SubmitButton";
import InputControl from "@/lib/components/forms/controls/InputControl";
import SelectControl from "@/lib/components/forms/controls/SelectControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "./action";
import { emptyForm, signupSchema, signUpForm } from "./schema";

const USER_TYPE = {
  TEACHER: {
    name: "Profesor",
    id: "1",
  },
  STUDENT: {
    name: "Estudiante",
    id: "2",
  },
  COORDINATOR: {
    name: "Coordinador",
    id: "3",
  },
};

const usuarios = [
  { key: USER_TYPE.TEACHER.id, label: USER_TYPE.TEACHER.name },
  { key: USER_TYPE.STUDENT.id, label: USER_TYPE.STUDENT.name },
  { key: USER_TYPE.COORDINATOR.id, label: USER_TYPE.COORDINATOR.name },
];

export default function SignUpForm() {
  const { control, formState, handleSubmit, watch } = useForm({
    defaultValues: { ...emptyForm },
    mode: "all",
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<signUpForm> = async (data) => {
    await createUserService(data);
    await signup(data);
  };

  const isCoordinator = watch("type") === USER_TYPE.COORDINATOR.id;
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
        isInvalid={true}
        errorMessage="Please enter a valid email"
        className="max-w-xs"
      />
      <InputControl
        label="Contraseña"
        control={control}
        name="password"
        type="password"
        defaultValue="aaaa@correo.unimet.edu.ve"
        isInvalid={true}
        errorMessage="Please enter a valid email"
        className="max-w-xs"
      />

      <InputControl
        label="Carnet o cedula"
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
        className="max-w-xs"
      />
      {isCoordinator && (
        <InputControl
          label="Campo adicional"
          control={control}
          name="type"
          type="text"
          className="max-w-xs"
        />
      )}

      <SubmitButton
        text="Iniciar Sesión"
        isLoading={formState.isLoading || formState.isSubmitting}
        className="col-span-2 w-[50%] justify-self-center"
      ></SubmitButton>
    </form>
  );
}
