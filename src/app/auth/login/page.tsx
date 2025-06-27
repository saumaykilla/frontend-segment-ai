import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <div className="w-full ">
        <LoginForm />
      </div>
    </div>
  );
}
