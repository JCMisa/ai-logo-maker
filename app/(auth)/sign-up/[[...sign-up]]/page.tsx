import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";

const SignUpPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <ClerkLoading>
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
    </section>
  );
};

export default SignUpPage;
