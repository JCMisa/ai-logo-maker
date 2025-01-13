import { db } from "@/utils/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { owner } = await req.json();

  try {
    // update the user credits
    const userRef = doc(db, "users", owner);
    const userSnap = await getDoc(userRef);
    await updateDoc(userRef, {
      credits: userSnap.exists() && userSnap.data().credits - 1,
    });

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error("Error writing document: ", e);
    return NextResponse.json({ status: "failed", error: e });
  }
}
