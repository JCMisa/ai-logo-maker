"use client";

import { Suspense, useEffect } from "react";
import Hero from "./(root)/_components/Hero";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Credits from "./(root)/_components/Credits";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const { user } = useUser();

  //save user
  const saveUser = async () => {
    // save user to database
    const result = await axios.post("/api/users", {
      userId: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.primaryEmailAddress?.emailAddress,
    });

    console.log("saved user: ", result?.data);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && saveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div>
      <Hero />
      <Suspense fallback={<LoaderCircle className="w-5 h-5 animate-spin" />}>
        <Credits />
      </Suspense>
    </div>
  );
}
