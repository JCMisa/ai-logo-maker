"use server";

import { parseStringify } from "@/lib/utils";
import { db } from "@/utils/FirebaseConfig";
import { currentUser } from "@clerk/nextjs/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
    } else {
      console.log("error occured");
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const updateUserSubscription = async (
  paymentIntentId: string,
  userEmail: string
) => {
  try {
    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data().isPremium) {
      return parseStringify({ data: "user already subscribed" });
    } else {
      // if user is not subscribed yet, then update isPremium property and credits of user
      // const userRef = doc(db, "users", userEmail);
      await updateDoc(userRef, {
        paymentIntentId: paymentIntentId,
        isPremium: true,
        credits: 100,
      });
      return parseStringify({ data: "user subscribed successfully" });
    }
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
