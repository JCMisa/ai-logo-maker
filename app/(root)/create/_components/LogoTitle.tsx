"use client";

import React from "react";
import HeadingDescription from "./HeadingDescription";
import { lookup } from "../../_data/Lookup";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

interface PROPS {
  onHandleInputChange: (e: string) => void;
}

const LogoTitle = ({ onHandleInputChange }: PROPS) => {
  const searchParams = useSearchParams();

  // const [title, setTitle] = useState<string>(
  //   (searchParams.get("title") as string) ?? ""
  // );

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
    </div>
  );
};

export default LogoTitle;
