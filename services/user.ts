"use server";

import { parseStringify } from "@/lib/utils";
import { db } from "@/utils/FirebaseConfig";
import { currentUser } from "@clerk/nextjs/server";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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

export const getUserLogos = async (owner: string) => {
  try {
    const q = query(collection(db, "logos"), where("owner", "==", owner));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      return parseStringify({ data: null });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userLogos: any[] = [];
    querySnapshot.forEach((doc) => {
      userLogos.push(doc.data());
    });
    return parseStringify({ data: userLogos });
  } catch (error) {
    handleError(error);
  }
};

export const deleteUserLogo = async (logoId: string) => {
  try {
    const docRef = doc(db, "logos", logoId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return parseStringify({
        data: "failure",
        error: "Document does not exist",
      });
    }

    await deleteDoc(docRef);
    return parseStringify({ data: "success" });
  } catch (error) {
    handleError(error);
    return parseStringify({ data: "failure", error: error });
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
