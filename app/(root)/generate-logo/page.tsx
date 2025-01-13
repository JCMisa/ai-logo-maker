"use client";

import React, { Suspense, useEffect, useState } from "react";
import { prompt } from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import LogoLoading from "@/components/custom/LogoLoading";
import { useUser } from "@clerk/nextjs";

const GenerateLogoPageContent = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    desc: "",
    palette: "",
    design: {
      image: "",
      prompt: "",
      title: "",
    },
    idea: "",
  });
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState<string>("/empty-img.jpg");

  const searchParams = useSearchParams();
  const mode = searchParams.get("type");
  console.log("mode: ", mode);

  useEffect(() => {
    if (typeof window !== undefined) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, []);

  const generateAiLogo = async () => {
    try {
      setLoading(true);

      const PROMPT = prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
        .replace("{logoDesc}", formData?.desc)
        .replace("{logoColor}", formData?.palette)
        .replace("{logoIdea}", formData?.idea)
        .replace("{logoDesign}", formData?.design?.title)
        .replace("{logoPrompt}", formData?.design?.prompt);

      if (user) {
        // generate logo from gemini to hugging face
        const result = await axios.post("/api/ai-logo-model", {
          prompt: PROMPT,
        });

        if (result?.data?.image !== null) {
          console.log("ai generated logo response: ", result?.data);
          toast(
            <p className="text-sm font-bold text-green-500">
              Image generated successfully
            </p>
          );
          setLogoImage(result?.data?.image);
          // save the data of logo to the database and update the user credits
          const logoToDb = await axios.post("/api/logos", {
            image: result?.data?.image,
            title: formData?.title,
            desc: formData?.desc,
            owner: user?.primaryEmailAddress?.emailAddress,
          });

          if (logoToDb?.data === "success") {
            // update the user credits
            const updateCredits = await axios.post("/api/credits", {
              owner: user.primaryEmailAddress?.emailAddress,
            });

            if (updateCredits?.data === "success") {
              toast(
                <p className="text-sm font-bold text-green-500">
                  Logo saved successfully
                </p>
              );
            }
          }
        }
      } else {
        toast(
          <p className="text-sm font-bold text-red-500">
            Failed to generate, please try again
          </p>
        );
      }
    } catch (error) {
      console.log("generate logo error: ", error);
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while generating the logo
        </p>
      );
    } finally {
      localStorage.removeItem("formData");
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <Link
        href={"/"}
        className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <p className="text-sm">Back to Home</p>
      </Link>

      <div className="mt-20 flex items-center justify-center">
        {!loading && logoImage ? (
          <Image
            src={logoImage ? logoImage : "/empty-img.jpg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-80 h-72 rounded-lg"
          />
        ) : (
          <LogoLoading />
        )}
      </div>

      <div className="mt-32 flex flex-col gap-4 items-center justify-center w-full">
        <Button
          className="w-[50%]"
          onClick={() => generateAiLogo()}
          disabled={loading}
        >
          Generate
        </Button>

        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-center">
            Generate a Logo in One Click
          </h2>
          <p className="text-lg text-gray-300 text-center">
            Click the generate button above and see the{" "}
            <span className="logo-text font-bold">MeowGic</span>
          </p>
          <span className="text-center text-xs text-gray-400">
            Maximum waiting time: 4 - 5 minutes
          </span>
        </div>
      </div>
    </div>
  );
};

const GenerateLogoPage = () => (
  <Suspense
    fallback={
      <div>
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </div>
    }
  >
    <GenerateLogoPageContent />
  </Suspense>
);

export default GenerateLogoPage;
