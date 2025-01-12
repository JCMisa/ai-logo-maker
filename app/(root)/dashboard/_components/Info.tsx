import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/user";
import { CoinsIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Info = async () => {
  const currentUser = await getCurrentUser();
  const userInfo: UserType = currentUser?.data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-primary">
          Hello {userInfo?.firstName} 👋🏻
        </h2>
        <div className="flex items-center gap-2">
          <CoinsIcon className="w-10 h-10" />
          <h2 className="font-bold text-3xl">
            {userInfo?.credits} Credits Left
          </h2>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <Link href={"/create"}>
          <Button>+ Create New Logo</Button>
        </Link>
      </div>
    </div>
  );
};

export default Info;
