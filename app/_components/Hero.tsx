import React from "react";
import { heroLookup } from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="logo-text text-5xl text-center font-bold">
        {heroLookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {heroLookup.HeroSubheading}
      </h2>
      <p className="text-lg text-gray-400 text-center">{heroLookup.HeroDesc}</p>

      <div className="flex gap-6 w-full max-w-2xl mt-10">
        <Input placeholder={heroLookup.InputTitlePlaceholder} />
        <Button className="w-full">Get Started</Button>
      </div>
    </div>
  );
};

export default Hero;
