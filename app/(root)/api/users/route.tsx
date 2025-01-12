import { parseStringify } from "@/lib/utils";
import { db } from "@/utils/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, firstName, lastName, email } = await req.json();
  try {
    // if user already exist
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      // insert new user
      const data = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        credits: 5,
        isPremium: false,
        paymentIntentId: "",
      };

      await setDoc(doc(db, "users", email), { ...data });

      return NextResponse.json(data);
    }
  } catch (e) {
    handleError(e);
  }
}

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
