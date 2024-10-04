import React from "react";

import IMage from "../../image/Image";
import Icon from "../../icon/Icon";

const Service = ({
  h1 = "Budget-Friendly Menu",
  h3 = "Great taste without breaking the bank .",
  name = "shipping",
}: any) => {
  return (
    <div className="grid grid-cols-4  p-4 gap-1 b max-h-fit bg-white rounded-md border">
      <div className="title col-span-3 flex flex-col">
        <h1 className="title text-[1.4em] col-span-1  ">
          {h1}
        </h1>
        <h3 className="text-gray-500">{h3}</h3>
      </div>
      <div className="thumb col-span-1  rounded-[10px]">
        <Icon name={name} className="w-full h-full object-cover" width={100} />
      </div>
    </div>
  );
};

export default Service;
