import { db } from "@/utils/FirebaseConfig";
import { aiLogoPrompt } from "@/utils/GeminiModel";
import axios from "axios";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, owner, title, desc } = await req.json();

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

    const data = {
      image: base64ImageWithMime,
      owner: owner,
      title: title,
      desc: desc,
    };

    try {
      // save logo to logos table with image and owner email, title, and description
      await setDoc(doc(db, "logos", Date.now().toString()), data);

      // update the user credits
      const userRef = doc(db, "users", owner);
      const userSnap = await getDoc(userRef);
      await updateDoc(userRef, {
        credits: userSnap.exists() && userSnap.data().credits - 1,
      });
    } catch (e) {
      console.error("Error writing document: ", e);
      return NextResponse.json({ error: e });
    }

    return NextResponse.json({ image: base64ImageWithMime });
  } catch (e) {
    console.error("Error generating image: ", e);
    return NextResponse.json({ error: e });
  }
}
