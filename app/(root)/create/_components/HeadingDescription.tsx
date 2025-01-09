import React from "react";

interface PROPS {
  title: string;
  description: string;
}

const HeadingDescription = ({ title, description }: PROPS) => {
  return (
    <div className="my-10">
      <h2 className="font-bold text-3xl text-primary">{title}</h2>
      <p className="text-lg text-gray-400 mt-2">{description}</p>
    </div>
  );
};

export default HeadingDescription;
