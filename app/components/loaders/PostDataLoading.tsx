import React from "react";
import { Riple } from "react-loading-indicators";
const PostDataLoading = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#00000096]">
      <Riple color="#32cd32"  size="medium" text="Loading" textColor="" />
    </div>
  );
};

export default PostDataLoading;
