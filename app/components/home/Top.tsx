import React from "react";
import Icon from "../icon/Icon";
import Link from "next/link";
import Recommendations from "./recommendations/Recommendations";
import Image from "next/image";
const Top = () => {
  return (
    <>
      <div className="flex flex-col  gap-5  p-4 min-h-[50vh]  ">
        <div className=" flex flex-col gap-4  justify-center ">
          <h1>Savor the Flavor - Discover Your Next Favorite Dish at FBG</h1>
          <p className="text-white">Your Favorite Food App From Now On</p>
        </div>
        <button className="p-4   flex gap-5  justify-center items-center bg-gradient-to-b px-5 bg-white  hover:scale-95 max-w-fit border-2 border-black ">
          <Icon name="order" width={35} className="" />
          <Link href={"/category/snacks"} className=" text-black ">
            Commandez daba
          </Link>
        </button>
      </div>
      <Image
          quality={100}
          src={"/images/home.png"}
          alt="img"
          width={200}
          height={300}
          className="object-cover w-[60%]  "
        />
    </>
  );
};

export default Top;
