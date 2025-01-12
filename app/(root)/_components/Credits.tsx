import { getCurrentUser } from "@/services/user";
import React, { useEffect, useState } from "react";

const Credits = () => {
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

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user?.data);
    };

    getUser();
  }, []);

  return (
    <div className="absolute bottom-5 right-5">
      Credits: {currentUser?.credits}
    </div>
  );
};

export default Credits;
