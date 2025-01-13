"use client";

import React, { useEffect, useState } from "react";
import { lookup } from "../../_data/Lookup";
import HeadingDescription from "./HeadingDescription";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PROPS {
  formData: FormDataType;
}

type PricingType = {
  title: string;
  icon: string;
  features: string[];
  button: string;
  buttonLink: string;
};

const PricingModel = ({ formData }: PROPS) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (formData && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      setIsDisabled(false);
    }
  }, [formData]);

  return (
    <div>
      <HeadingDescription
        title={lookup.LogoPricingModelTitle}
        description={lookup.LogoPricingModelDesc}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {lookup.pricingOption.map((pricing: PricingType, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 border rounded-2xl bg-dark-500 relative"
          >
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={1000}
              height={1000}
              className="w-20 h-20"
            />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div className="mb-14">
              {pricing.features.map((feature: string, index: number) => (
                <h2 key={index} className="text-lg mt-3">
                  {feature}
                </h2>
              ))}
            </div>

            {pricing.title === "Free" ? (
              <Button
                className="absolute bottom-5"
                onClick={() =>
                  router.push(`/generate-logo?type=${pricing.title}`)
                }
                disabled={isDisabled}
              >
                {pricing.button}
              </Button>
            ) : (
              <Button
                className="absolute bottom-5"
                onClick={() => router.push(`/upgrade`)}
              >
                {pricing.button}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingModel;
