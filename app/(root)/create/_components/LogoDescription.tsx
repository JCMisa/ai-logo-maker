import React from "react";
import HeadingDescription from "./HeadingDescription";
import { lookup } from "../../_data/Lookup";
import { Input } from "@/components/ui/input";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const LogoDescription = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup.LogoDescTitle}
        description={lookup.LogoDescDesc}
      />

      <Input
        type="text"
        defaultValue={formData?.desc}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={lookup.InputTitlePlaceholder}
      />
    </div>
  );
};

export default LogoDescription;
