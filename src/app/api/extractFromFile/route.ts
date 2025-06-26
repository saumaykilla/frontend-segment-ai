import {
  NextRequest,
  NextResponse,
} from "next/server";
import axios from "axios";
export async function POST(
  req: NextRequest
) {
  const formData =
    await req.formData();

  const file =
    formData.get(
      "file"
    ) as File;

  if (
    !file
  )
    return NextResponse.json(
      {
        message:
          "incorrect File Uploaded",
      },
      {
        status: 500,
      }
    );

  const backendForm =
    new FormData();
  backendForm.append(
    "file",
    file
  );

  try {
    const request =
      await axios.post(
        `https://plankton-app-qajlk.ondigitalocean.app/extraction_api`,
        backendForm
      );

    const data =
      await request.data;
    return new Response(
      JSON.stringify(
        data
      ),
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
        error:
          error,
      },
      {
        status: 400,
      }
    );
  }
}
