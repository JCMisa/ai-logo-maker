import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PROPS {
  formData: FormDataType;
}

const ContinuePremium = ({ formData }: PROPS) => {
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
        title="Continue Generating Logo"
        description="Generate your logo with ease."
      />

      <div className="mt-5 flex flex-col gap-4 items-center justify-center">
        <Button
          onClick={() => router.push(`/generate-logo?type=Premium`)}
          disabled={isDisabled}
        >
          Generate Logo
        </Button>
        {isDisabled && (
          <p className="text-gray-400 text-center text-xs">
            Make sure that you provided enough information about the logo you
            want to create.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContinuePremium;
