"use client";

import { Suspense, useEffect } from "react";
import Hero from "./(root)/_components/Hero";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Credits from "./(root)/_components/Credits";
import { LoaderCircle } from "lucide-react";
import HomeStatistics from "@/components/custom/HomeStatistics";
import HomeSteps from "@/components/custom/HomeSteps";
import HomeContact from "@/components/custom/HomeContact";

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
    <div className="flex flex-col gap-40">
      <div className="mt-20">
        <Hero />
      </div>
      <HomeStatistics />
      <HomeSteps />
      <HomeContact />
      <Suspense fallback={<LoaderCircle className="w-5 h-5 animate-spin" />}>
        <Credits />
      </Suspense>
    </div>
  );
}
