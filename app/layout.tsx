import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const robotoSlab = Roboto_Serif({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeowGic",
  description: "Unleash the Meowgic in Your Brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: "/logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#EEEEF1",
          colorPrimary: "#DB1A5A",
          colorBackground: "#19191A",
          colorInputBackground: "#131315",
          colorInputText: "#EEEEF1",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        </head>
        <body className={`${robotoSlab.className} antialiased`}>
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
