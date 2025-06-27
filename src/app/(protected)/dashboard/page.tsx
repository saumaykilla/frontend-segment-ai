import React from "react";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/dashboardClient";

const page =
  async () => {
    const supabase =
      await createClient();
    const {
      data,
      error,
    } =
      await supabase
        .from(
          "documents"
        )
        .select();
    if (
      error
    ) {
      console.log(
        "error fetching data"
      );
    }

    return (
      <DashboardClient
        data={
          data
        }
      />
    );
  };

export default page;
