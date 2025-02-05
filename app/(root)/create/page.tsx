"use client";

import React, { useEffect, useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDescription from "./_components/LogoDescription";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";
import { getCurrentUser } from "@/services/user";
import ContinuePremium from "./_components/ContinuePremium";
import Link from "next/link";

const CreateLogo = () => {
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    desc: "",
    palette: "",
    design: {
      image: "",
      prompt: "",
      title: "",
    },
    idea: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user?.data);
    };

    getUser();
  }, []);

  const onHandleInputChange = (
    field: string,
    value: string | LogoDesignType
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log(formData);
  };

  return (
    <>
      {(currentUser?.isPremium && currentUser?.credits != 0) ||
      (currentUser?.isPremium === false && currentUser?.credits != 0) ? (
        <div className="mt-28 p-10 border rounded-xl 2xl:mx-72 shadow-lg flex flex-col gap-5">
          {step === 1 ? (
            <LogoTitle
              onHandleInputChange={(v) => onHandleInputChange("title", v)}
            />
          ) : step === 2 ? (
            <LogoDescription
              onHandleInputChange={(v) => onHandleInputChange("desc", v)}
              formData={formData}
            />
          ) : step === 3 ? (
            <LogoColorPalette
              onHandleInputChange={(v) => onHandleInputChange("palette", v)}
              formData={formData}
            />
          ) : step === 4 ? (
            <LogoDesigns
              onHandleInputChange={(v) => onHandleInputChange("design", v)}
              formData={formData}
            />
          ) : step === 5 ? (
            <LogoIdea
              onHandleInputChange={(v) => onHandleInputChange("idea", v)}
              formData={formData}
            />
          ) : step === 6 ? (
            currentUser?.isPremium ? (
              <ContinuePremium formData={formData} />
            ) : (
              <PricingModel formData={formData} />
            )
          ) : null}

          <div className="flex items-center justify-between">
            {step !== 1 && (
              <Button
                variant={"outline"}
                onClick={() => setStep((prev) => prev - 1)}
              >
                <ArrowLeft /> Previous
              </Button>
            )}

            <Button
              onClick={() => setStep((prev) => prev + 1)}
              disabled={step >= 6}
            >
              <ArrowRight /> Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <h1 className="text-4xl font-bold text-center">
            Please upgrade to Premium to create a logo.
          </h1>
          <Link href={"/upgrade"}>
            <Button>Upgrade</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CreateLogo;
