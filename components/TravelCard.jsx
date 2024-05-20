import Image from "next/image";
import React from "react";

const TravelCard = ({ imgSrc, desc, title }) => {
  return (
    <div className="flex flex-col gap-10 group">
      <div className="w-full relative overflow-hidden">
        <Image
          src={imgSrc}
          width={400}
          height={640}
          className="group-hover:scale-110 transition-all duration-300"
        />
        <p className="feature-bold text-white absolute bottom-10 left-10 max-w-[60%]">
          {title}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="">
          <p className="content-regular text-neutral-800 mt-6 max-w-[350px]">
            {desc}
          </p>
        </div>
        <p className="btn-outline w-fit mt-10 text-black">Discover more</p>
      </div>
    </div>
  );
};

export default TravelCard;
