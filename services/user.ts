"use server";

import { parseStringify } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  try {
    const userFromClerk = await currentUser();
    if (!userFromClerk) return parseStringify({ data: null });
    // const userFromDb = await db
    //   .select()
    //   .from(User)
    //   .where(
    //     eq(
    //       User.email,
    //       userFromClerk?.primaryEmailAddress?.emailAddress as string
    //     )
    //   );
    // if (userFromDb?.length > 0) {
    //   return parseStringify({ data: userFromDb[0] });
    // }
    return parseStringify({ data: userFromClerk });
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
