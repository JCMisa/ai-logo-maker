import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { lookup } from "../../_data/Lookup";
import { logoDesign } from "../../_data/LogoDesign";
import Image from "next/image";

interface PROPS {
  onHandleInputChange: (e: LogoDesignType) => void;
  formData: FormDataType;
}

const LogoDesigns = ({ onHandleInputChange, formData }: PROPS) => {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup.LogoDesignTitle}
        description={lookup.LogoDesignDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {logoDesign.map((design: LogoDesignType, index: number) => (
          <div
            key={index}
            className={`cursor-pointer p-1 hover:scale-105 transition-all ${
              selectedOption === design.title &&
              "border rounded-xl border-primary"
            }`}
            onClick={() => {
              setSelectedOption(design.title);
              onHandleInputChange(design);
            }}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={1000}
              height={1000}
              className="w-full h-52 rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoDesigns;
