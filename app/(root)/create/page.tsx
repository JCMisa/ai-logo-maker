"use client";

import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDescription from "./_components/LogoDescription";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";

const CreateLogo = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    desc: "",
    palette: "",
    design: {
      image: "string",
      prompt: "string",
      title: "string",
    },
    idea: "string",
  });

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
        <PricingModel formData={formData} />
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
  );
};

export default CreateLogo;
