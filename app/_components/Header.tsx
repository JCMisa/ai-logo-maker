import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-2">
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
      </div>
      <Button>Get Started</Button>
    </div>
  );
};

export default Header;
