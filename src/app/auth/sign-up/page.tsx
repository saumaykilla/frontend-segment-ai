import { SignUpForm } from "@/components/auth/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <div className="w-full">
        <SignUpForm />
      </div>
    </div>
  );
}
