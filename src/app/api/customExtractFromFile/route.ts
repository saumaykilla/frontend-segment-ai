import {
  NextRequest,
  NextResponse,
} from "next/server";

import { GoogleGenAI } from "@google/genai";

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
  const arrayBuffer =
    await file.arrayBuffer();
  const base64 =
    Buffer.from(
      arrayBuffer
    ).toString(
      "base64"
    );
  const ai =
    new GoogleGenAI(
      {
        apiKey:
          process
            .env
            .GEMINI_API_KEY!,
      }
    );

  try {
    const contents =
      [
        {
          text: "extract the order line items from the uploaded file, rename the field containing details of the item like (Brass Nut 1/2 20mm Galvanized Coarse) as Request Item",
        },
        {
          inlineData:
            {
              mimeType:
                file.type ||
                "application/pdf",
              data: base64,
            },
        },
      ];
    const geminiResponse =
      await ai.models.generateContent(
        {
          model:
            "gemini-2.5-flash",
          contents,
          config:
            {
              responseMimeType:
                "application/json",
              responseJsonSchema:
                {
                  type: "array",
                  items:
                    {
                      type: "object",
                    },
                },
            },
        }
      );

    const result =
      JSON.parse(
        geminiResponse?.text ||
          "[]"
      );
    return new Response(
      JSON.stringify(
        result
      ),
      {
        status: 200,
        headers:
          {
            "Content-Type":
              "application/json",
          },
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
