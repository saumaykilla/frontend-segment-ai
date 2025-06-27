import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function NotFound() {
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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-[#2951BC]">
          Not
          Found
        </h2>
        <p className="text-lg text-gray-600">
          Could
          not
          find
          requested
          resource.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 text-white bg-[#2951BC] rounded-xl hover:bg-[#1f3fa1] transition"
        >
          Return
          Home
        </Link>
      </div>
    </div>
  );
}
