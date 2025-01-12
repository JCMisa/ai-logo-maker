"use client";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/user";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
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
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-lg">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={1000}
          height={1000}
          className="w-14 h-14"
        />
        <h2 className="font-bold text-2xl logo-text hidden sm:block">
          MeowGic
        </h2>
      </Link>
      {currentUser ? (
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <UserButton />
            <div className="flex flex-col items-start">
              <p className="text-sm">
                {currentUser?.firstName} {currentUser?.lastName}
              </p>
              <span className="text-xs text-gray-400">
                {currentUser?.email}
              </span>
            </div>
          </div>
          <Button>Dashboard</Button>
        </div>
      ) : (
        <Link href={"/sign-in"}>
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
