"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user } = useUser();

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
      {user ? (
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <UserButton />
            <div className="flex flex-col items-start">
              <p className="text-sm">{user?.fullName}</p>
              <span className="text-xs text-gray-400">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
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
