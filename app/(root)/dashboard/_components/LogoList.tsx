"use client";

import EmptyList from "@/components/custom/EmptyList";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getUserLogos } from "@/services/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const LogoList = () => {
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: 0,
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    credits: 0,
    isPremium: false,
    paymentIntentId: "",
  });
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user?.data);
    };

    getUser();
  }, []);

  const fetchUserLogos = async () => {
    try {
      const result = await getUserLogos(currentUser?.email);
      if (result?.data?.length > 0) {
        setLogoList(result?.data);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching user logos
        </p>
      );
    }
  };

  useEffect(() => {
    fetchUserLogos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const image = event.currentTarget;
    if (image.requestFullscreen) {
      image.requestFullscreen();
    } else if (image.requestFullscreen) {
      image.requestFullscreen();
    } else if (image.requestFullscreen) {
      image.requestFullscreen();
    } else if (image.requestFullscreen) {
      image.requestFullscreen();
    }
  };

  const downloadImage = (image: string, name: string) => {
    const base64Image = image;
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = `${name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-10">
      {logoList?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {logoList?.map((logo: LogoType, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-dark-500 rounded-lg"
            >
              {logo?.image ? (
                <Image
                  src={logo?.image}
                  alt={logo?.title}
                  width={1000}
                  height={1000}
                  className="w-52 h-52 rounded-lg cursor-pointer hover:scale-105 transition-all"
                  onClick={handleImageClick}
                />
              ) : (
                <Image
                  src={"/empty-img.jpg"}
                  alt={logo?.title}
                  width={1000}
                  height={1000}
                  className="w-52 h-52 rounded-lg cursor-pointer hover:scale-105 transition-all"
                />
              )}

              <h2 className="text-center text-lg font-medium mt-2 line-clamp-1">
                {logo?.title}
              </h2>
              <p className="text-sm text-gray-400 text-center min-h-20 max-h-20 overflow-auto card-scroll">
                {logo?.desc}
              </p>

              <div className="flex items-end justify-end w-full">
                <Button
                  className="mt-5"
                  onClick={() => downloadImage(logo?.image, logo?.title)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyList
          header="No Logo Found"
          subheader="Please create one and come back to your dashboard later."
        />
      )}
    </div>
  );
};

export default LogoList;
