import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const robotoCondenced = Roboto_Condensed({
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
      <body className={`${robotoCondenced.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
