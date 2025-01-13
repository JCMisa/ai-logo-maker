import Link from "next/link";
import React from "react";

const HomeFooter = () => {
  return (
    <div className="bg-dark-100 relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6  text-[#76828D] flex flex-wrap justify-centerflex justify-between">
        <div className="p-5">
          <div className="text-xs uppercase text-[#E8E9E9] font-medium">
            Home
          </div>
          <Link className="my-3 block" href="/">
            Services <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            Products <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            About Us <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            Pricing <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            Partners <span className="text-primary text-xs p-1">New</span>
          </Link>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase text-[#E8E9E9] font-medium">
            Resources
          </div>

          <Link className="my-3 block" href="/">
            Documentation <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            Tutorials <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            Support <span className="text-primary text-xs p-1">New</span>
          </Link>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase text-[#E8E9E9] font-medium">
            Support
          </div>

          <Link className="my-3 block" href="/">
            Help Center <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            Privacy Policy <span className="text-primary text-xs p-1"></span>
          </Link>
          <Link className="my-3 block" href="/">
            Conditions <span className="text-primary text-xs p-1"></span>
          </Link>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase text-[#E8E9E9] font-medium">
            Contact us
          </div>

          <Link className="my-3 block" href="/">
            San Pablo City, Laguna, Philippines
            <span className="text-primary text-xs p-1"></span>
          </Link>

          <Link className="my-3 block" href="/">
            jcmisa.dev@gmail.com
            <span className="text-primary text-xs p-1"></span>
          </Link>
        </div>
      </div>

      <p className="absolute bottom-5 right-5 text-gray-400 text-xs">
        Made with 🤍 by <span className="text-white">JCMIsa</span>
      </p>
    </div>
  );
};

export default HomeFooter;
