import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";

const SignInPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <ClerkLoading>
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </section>
  );
};

export default SignInPage;
