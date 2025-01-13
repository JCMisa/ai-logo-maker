"use client";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/user";
import { CoinsIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Info = () => {
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: 0,
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    credits: 0,
    isPremium: false,
    paymentIntentId: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user?.data);
    };

    getUser();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-primary">
          Hello {currentUser?.firstName} 👋🏻
        </h2>
        <div className="flex items-center gap-2">
          <CoinsIcon className="w-10 h-10" />
          <h2 className="font-bold text-3xl">
            {currentUser?.credits} Credits Left
          </h2>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <Link href={"/create"}>
          <Button>+ Create New Logo</Button>
        </Link>
      </div>
    </div>
  );
};

export default Info;
