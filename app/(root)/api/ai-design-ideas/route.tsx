import { parseStringify } from "@/lib/utils";
import { chatSession } from "@/utils/GeminiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await chatSession.sendMessage(prompt);
    return NextResponse.json(JSON.parse(result.response.text()));
  } catch (e) {
    handleError(e);
  }
}

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
