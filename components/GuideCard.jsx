import Image from "next/image";
import React from "react";

const GuideCard = ({ imgSrc, name, info, location, desc }) => {
  return (
    <div className="flex flex-col gap-16 group">
      <div className="overflow-hidden">
        <Image
          src={imgSrc}
          width={350}
          height={350}
          className="group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col">
        <div className="pl-4">
          <p className="feature-bold text-primary">{name}</p>
          <p className="content-emphasis text-primary mt-2">{info}</p>
          <div className="flex items-end gap-1 mt-4">
            <Image src={"/images/guide-map.png"} width={16} height={16} />

            <p className="caption-bold text-neutral-600">{location}</p>
          </div>
          <p className="content-regular text-neutral-800 max-w-[60%] mt-6">
            {desc}
          </p>
        </div>
        <p className="btn-outline text-primary w-fit mt-6">Book Guide</p>
      </div>
    </div>
  );
};

export default GuideCard;
