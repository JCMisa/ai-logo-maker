import React from "react";

const EmptyList = ({
  header,
  subheader,
}: {
  header: string;
  subheader: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="loader-empty">
        <div className="loaderMiniContainer-empty">
          <div className="barContainer-empty">
            <span className="bar-empty"></span>
            <span className="bar-empty bar2-empty"></span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 101 114"
            className="svgIcon-empty"
          >
            <circle
              strokeWidth="7"
              stroke="#DB1A5A"
              transform="rotate(36.0692 46.1726 46.1727)"
              r="29.5497"
              cy="46.1727"
              cx="46.1726"
            ></circle>
            <line
              strokeWidth="7"
              stroke="#DB1A5A"
              y2="111.784"
              x2="97.7088"
              y1="67.7837"
              x1="61.7089"
            ></line>
          </svg>
        </div>
      </div>
      <div className="mt-24">
        <p className="text-lg -mt-10 text-center">{header}</p>
        <p className="text-sm text-gray-400 text-center">{subheader}</p>
      </div>
    </div>
  );
};

export default EmptyList;
