import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button>Click</Button>
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={1000}
        height={1000}
        className="w-14 h-14"
      />
    </div>
  );
}
