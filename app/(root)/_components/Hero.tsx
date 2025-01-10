"use client";

import React, { useState } from "react";
import { lookup } from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Hero = () => {
  const [logoTitle, setLogoTitle] = useState<string>("");

  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="logo-text text-5xl text-center font-bold">
        {lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {lookup.HeroSubheading}
      </h2>
      <p className="text-lg text-gray-400 text-center">{lookup.HeroDesc}</p>

      <div className="flex gap-6 w-full max-w-2xl mt-10">
        <Input
          placeholder={lookup.InputTitlePlaceholder}
          onChange={(e) => setLogoTitle(e.target.value)}
        />
        <SignedIn>
          <Link href={`/create?title=${logoTitle}`} className="w-full">
            <Button className="w-full">Get Started</Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="w-full">Sign in</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Hero;
