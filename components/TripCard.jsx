import Image from "next/image";
import React from "react";

const TripCard = ({ imgSrc, name, info, location, desc, price }) => {
  return (
    <div className="flex flex-col gap-8 w-fit min-w-[350px] max-w-[350px] group">
      <div className="relative overflow-hidden cursor-pointer">
        <Image
          src={imgSrc}
          width={370}
          height={600}
          className="transition-all duration-300 group-hover:scale-110"
        />
        <div className="absolute flex justify-between bottom-10 left-10 right-10">
          <p className="caption-regular text-neutral-100 max-w-[50%]">
            4 available tour guides,
            <br /> ready to assist
          </p>
          <div className="flex relative min-w-[80px]">
            <Image
              src={"/images/Person1.png"}
              width={46}
              height={46}
              className="absolute left-0 top-0 bottom-0"
            />
            <Image
              src={"/images/Person2.png"}
              width={46}
              height={46}
              className="absolute left-6 top-0 bottom-0"
            />
            <Image
              src={"/images/Person3.png"}
              width={46}
              height={46}
              className="absolute left-12 right-0"
            />
          </div>
        </div>
        <div className="absolute top-10 left-10">
          <p className="extrabold-12 text-baseWhite">{info}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="">
          <p className="feature-bold text-baseWhite min-h-14">{name}</p>
          <div className="flex items-end gap-2 mt-4">
            <Image src={"/images/TripMap.png"} width={16} height={16} />

            <p className="content-regular text-neutral-100">{location}</p>
          </div>
          <p className="content-regular text-neutral-100 max-w-[90%] mt-8 min-h-16">
            {desc}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-10">
        <div className="flex flex-col ">
          <p className="caption-regular text-white">from</p>
          <p className="highlight-bold text-neutral-100">SAR {price}</p>
        </div>
        <p className="btn-outline-white text-baseWhite w-fit">Book this trip</p>
      </div>
    </div>
  );
};

export default TripCard;
