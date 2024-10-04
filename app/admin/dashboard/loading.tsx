import React from "react";
import {  Mosaic } from "react-loading-indicators";

const loading = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center ">
      <Mosaic color="#ffffff"  size="medium" text="Loading" textColor="" />
    </div>
  );
};

export default loading;
