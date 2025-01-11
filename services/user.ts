"use server";

import { parseStringify } from "@/lib/utils";
import { db } from "@/utils/FirebaseConfig";
import { currentUser } from "@clerk/nextjs/server";
import { doc, getDoc } from "firebase/firestore";

export const getCurrentUser = async () => {
  try {
    const userFromClerk = await currentUser();
    if (!userFromClerk) return parseStringify({ data: null });

    const docRef = doc(
      db,
      "users",
      userFromClerk?.primaryEmailAddress?.emailAddress as string
    );
    const userFromDb = await getDoc(docRef);

    if (userFromDb.exists()) {
      return parseStringify({ data: userFromDb.data() });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
