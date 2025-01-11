"use client";

import { getCurrentUser } from "@/services/user";
import React, { useEffect, useState } from "react";
import { prompt } from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const GenerateLogoPage = () => {
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: 0,
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    credits: 0,
  });
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
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user?.data);
    };

    if (typeof window !== undefined) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    console.log("current user info: ", currentUser?.email);
  }, [currentUser]);

  const generateAiLogo = async () => {
    try {
      setLoading(true);

      const PROMPT = prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
        .replace("{logoDesc}", formData?.desc)
        .replace("{logoColor}", formData?.palette)
        .replace("{logoIdea}", formData?.idea)
        .replace("{logoDesign}", formData?.design?.title)
        .replace("{logoPrompt}", formData?.design?.prompt);

      console.log(
        "check info: ",
        currentUser?.email,
        formData?.title,
        formData?.desc
      );

      // generate logo from gemini to hugging face
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        owner: currentUser?.email,
        title: formData?.title,
        desc: formData?.desc,
      });

      if (result?.data?.image !== null) {
        console.log("ai generated logo response: ", result?.data);
        setLogoImage(result?.data?.image);
      }
    } catch (error) {
      console.log("generate logo error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   currentUser && generateAiLogo();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData?.title, formData?.desc, currentUser]);

  return (
    <div>
      <Button onClick={() => generateAiLogo()}>Generate</Button>
      {!loading && logoImage ? (
        <Image
          src={logoImage ? logoImage : "/empty-img.jpg"}
          alt="logo"
          width={1000}
          height={1000}
          className="w-52 h-52"
        />
      ) : (
        <LoaderCircle className="animate-spin w-5 h-5" />
      )}
    </div>
  );
};

export default GenerateLogoPage;
