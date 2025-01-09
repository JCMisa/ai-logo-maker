import { chatSession } from "@/utils/GeminiModel";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { lookup } from "../../_data/Lookup";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const LogoIdea = ({ onHandleInputChange, formData }: PROPS) => {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);
  const [loading, setLoading] = useState(false);

  const generateLogoDesignIdea = async () => {
    try {
      setLoading(true);

      const PROMPT = `
      Generate 6 logo ideas based on the following user input:
        - Design: ${formData?.design?.title}
        - Title: ${formData?.title} 
        - Description: ${formData?.desc}
        - based on the design, ${formData?.design?.prompt}
      The response should be an array of six strings, with each string describing a unique logo design. For example: 
      ["logo idea 1", "logo idea 2", "logo idea 3", "logo idea 4", "logo idea 5", "logo idea 6"].
      `;

      const aiResponse = await chatSession.sendMessage(PROMPT);

      if (aiResponse) {
        const parsedAiResponse = JSON.parse(aiResponse.response.text());
        console.log("ai response (parsed): ", parsedAiResponse);
        setIdeas(parsedAiResponse);
      }

      //todo: store the ai response to the database and display it as options
      //todo: or instead of the generated ai response, we can store only the selected option in the database
    } catch (error) {
      console.log("error generating logo idea: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <HeadingDescription
          title={lookup.LogoIdeaTitle}
          description={lookup.LogoIdeaDesc}
        />

        <Button onClick={generateLogoDesignIdea} disabled={loading}>
          {loading ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            "Generate Idea"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {ideas?.map((idea: string, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(idea);
              onHandleInputChange(idea);
            }}
            className={`p-3 px-5 rounded-lg bg-dark-100 min-h-32 max-h-32 overflow-auto card-scroll cursor-pointer hover:scale-95 transition-all ${
              selectedOption === idea && "border border-primary"
            } `}
          >
            <p className="text-sm text-center">{idea}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoIdea;
