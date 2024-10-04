"use client" ;
import Image from "next/image";
import React from "react";

const Icon = ({
  name = "Menu",
  width = 20,
  height = 20,
  className,
  onClick,
  children
}: any) => {
  return (
    <div
      className={` flex items-center justify-center ${className} `}
      onClick={onClick}
    >
      <Image src={`/icons/${name}.svg`}  alt="" width={width} height={height} />
      {children}
    </div>
  );
};

export default Icon;
