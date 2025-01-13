import { db } from "@/utils/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import uuid4 from "uuid4";

export async function POST(req: Request) {
  const { image, title, desc, owner } = await req.json();

  try {
    const logoId = uuid4();
    const data = {
      logoId: logoId,
      image: image,
      owner: owner,
      title: title,
      desc: desc,
    };

    await setDoc(doc(db, "logos", logoId), data);

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
