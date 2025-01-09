import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

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
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body className={`${robotoSlab.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
