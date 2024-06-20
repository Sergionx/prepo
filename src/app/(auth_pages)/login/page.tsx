import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl ">Prepo</h1>
      <p className="text-pretty">
        Para acceder al sistema, necesitamos la siguiente información de tu
        parte.
      </p>

      <LoginForm />
    </>
  );
}
