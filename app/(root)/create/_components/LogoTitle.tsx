"use client";

import React, { Suspense } from "react";
import HeadingDescription from "./HeadingDescription";
import { lookup } from "../../_data/Lookup";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

interface PROPS {
  onHandleInputChange: (e: string) => void;
}

const LogoTitleContent = ({ onHandleInputChange }: PROPS) => {
  const searchParams = useSearchParams();

  const title: string = (searchParams.get("title") as string) ?? "";

  return (
    <div>
      <HeadingDescription
        title={lookup.LogoTitle}
        description={lookup.LogoTitleDesc}
      />

      <Input
        type="text"
        defaultValue={title}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={lookup.InputTitlePlaceholder}
      />
      <span className="text-xs text-gray-400">
        Do not provide a title if you don&apos;t want a text to appear in your
        logo.
      </span>
    </div>
  );
};

const LogoTitle = (props: PROPS) => (
  <Suspense
    fallback={
      <div>
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </div>
    }
  >
    <LogoTitleContent {...props} />
  </Suspense>
);

export default LogoTitle;
