import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { lookup } from "../../_data/Lookup";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { prompt } from "../../_data/Prompt";

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

      const PROMPT = prompt.DESIGN_IDEA_PROMPT.replace(
        "{logoType}",
        formData?.design?.title
      )
        .replace("{logoTitle}", formData?.title)
        .replace("{logoDesc}", formData?.desc)
        .replace("{logoPrompt}", formData?.design?.prompt);

      const result = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT,
      });

      setIdeas(result?.data?.ideas);

      //todo: store the ai response to the database and display it as options
      //todo: or instead of the generated ai response, we can store only the selected option in the database
    } catch (error) {
      console.log("error generating logo idea: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateLogoDesignIdea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {loading ? (
        <div className="flex items-center justify-center">
          <LoaderCircle className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {ideas &&
            ideas?.map((idea: string, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedOption(idea);
                  onHandleInputChange(idea);
                }}
                className={`p-2 px-3 rounded-full bg-dark-100 border cursor-pointer hover:scale-95 transition-all ${
                  selectedOption === idea && "border-primary"
                }`}
              >
                <p className="text-sm text-center">{idea}</p>
              </div>
            ))}
          <p
            onClick={() => {
              setSelectedOption("Let AI select the best idea");
              onHandleInputChange("Let AI select the best idea");
            }}
            className={`p-2 px-3 rounded-full bg-dark-100 border cursor-pointer hover:scale-95 transition-all text-sm text-center ${
              selectedOption === "Let AI select the best idea" &&
              "border-primary"
            }`}
          >
            Let AI select the best idea
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoIdea;
