import axios from "axios";
import {
  NextRequest,
  NextResponse,
} from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  req: NextRequest
) {
  const data =
    await req.json();
  const url = `${process.env.BACKEND_URL}/api/v1/generate`;
  const supabase =
    await createClient();
  const token =
    (
      await supabase.auth.getSession()
    )
      .data
      ?.session
      ?.access_token;
  if (
    token &&
    data
  ) {
    try {
      const response =
        await axios.post(
          url,
          data,
          {
            headers:
              {
                Authorization: `Bearer ${token}`,
              },
          }
        );
      const res =
        response.data;

      return NextResponse.json(
        {
          data: res,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(
        error
      );
      return NextResponse.json(
        {
          message:
            "Failed to connect with backend",
        },
        {
          status: 404,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        message:
          "Not Authorized",
      },
      {
        status: 401,
      }
    );
  }
}
