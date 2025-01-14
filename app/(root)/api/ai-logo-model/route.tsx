export const maxDuration = 60;

import { aiLogoPrompt } from "@/utils/GeminiModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await aiLogoPrompt.sendMessage(prompt);
    console.log(JSON.parse(result.response.text())?.prompt);
    const aiPrompt = JSON.parse(result.response.text())?.prompt;

    // generate logo from ai model
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      aiPrompt,
      {
        headers: {
          Authorization: "Bearer " + process.env.HUGGING_FACE_API_KEY!,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    console.log("Received response from Hugging Face");

    // convert to base64 image
    const buffer = Buffer.from(response?.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({ image: base64ImageWithMime });
  } catch (e) {
    console.error("Error generating image: ", e);
    return NextResponse.json({ error: e });
  }
}
