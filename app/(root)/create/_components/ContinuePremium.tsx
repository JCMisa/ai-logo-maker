import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PROPS {
  formData: FormDataType;
}

const ContinuePremium = ({ formData }: PROPS) => {
  const router = useRouter();

  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div>
      <HeadingDescription
        title="Continue Generating Logo"
        description="Generate your logo with ease."
      />

      <div className="mt-5">
        <Button onClick={() => router.push(`/generate-logo?type=Premium`)}>
          Generate Logo
        </Button>
      </div>
    </div>
  );
};

export default ContinuePremium;
