import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/navbar";
import { Fragment } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.auth.getUser();
  if (
    error ||
    !data?.user
  ) {
    redirect(
      "/auth/login"
    );
  }
  return (
    <>
      <Navbar />
      <div className="w-screen h-screen pt-20 container mx-auto">
        {
          children
        }
      </div>
    </>
  );
}
