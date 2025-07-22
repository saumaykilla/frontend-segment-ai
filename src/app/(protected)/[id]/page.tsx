import GeneratedData from "@/components/GeneratedData";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const ViewInsight =
  async ({
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }) => {
    const {
      id,
    } =
      await params;
    const supabase =
      await createClient();

    const {
      data,
      error,
    } =
      await supabase
        .from(
          "insight"
        )
        .select(
          "*"
        )
        .eq(
          "id",
          id
        )
        .single();
    if (
      !data ||
      error
    ) {
      redirect(
        "/dashboard"
      );
    }

    return (
      <div className="flex flex-1 flex-col h-full ">
        <GeneratedData
          data={
            data?.insights
          }
          productName={
            data?.productName
          }
          segment={
            data?.segment
          }
          objective={
            data?.objective
          }
          generateDate={
            data?.generateDate
          }
        />
      </div>
    );
  };

export default ViewInsight;
