import React from "react";
import Image from "next/image";
const IMage = ({
  className = "w-full h-full object-cover",
  width = 100,
  height = 100,
  name,
}: any) => {
  return (
    <Image
      src={`/images/lobia.png`}
      alt=""
      width={width}
      height={height}
      className={className}
      quality={100}
    />
  );
};

export default IMage;
