import HomeFooter from "@/components/custom/HomeFooter";
import Header from "./(root)/_components/Header";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56">{children}</div>
      <div className="mt-20">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Provider;
