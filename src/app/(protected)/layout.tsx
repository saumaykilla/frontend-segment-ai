import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

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
      <div className="w-screen h-screen flex flex-col md:flex-row">
        <aside
          id="sidebar"
          className="hidden md:flex inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out md:translate-x-0"
        >
          <Sidebar
            userName={
              data
                ?.user
                ?.email as string
            }
          />
        </aside>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center w-full border-b border-gray-200 justify-between">
          <MobileHeader />
        </div>

        {/* Children wrapper: flex-grow and shrink properly */}
        <main className="flex-1 min-w-0  h-full overflow-auto">
          {
            children
          }
        </main>
      </div>
    </>
  );
}
