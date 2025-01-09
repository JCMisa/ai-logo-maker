import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { lookup } from "../../_data/Lookup";
import { logoColors } from "../../_data/Colors";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const LogoColorPalette = ({ onHandleInputChange, formData }: PROPS) => {
  const [selectedOption, setSelectedOption] = useState(formData?.palette);
  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup.LogoColorPaletteTitle}
        description={lookup.LogoColorPaletteDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {logoColors.map((palette: LogoColorType) => (
          <div
            key={palette.name}
            className={`flex p-1 cursor-pointer ${
              selectedOption === palette.name &&
              "border rounded-lg border-primary"
            }`}
          >
            {palette.colors.map((color: string, index: number) => (
              <div
                key={index}
                className="h-24 w-full"
                style={{
                  backgroundColor: color,
                }}
                onClick={() => {
                  setSelectedOption(palette.name);
                  onHandleInputChange(palette.name);
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoColorPalette;
