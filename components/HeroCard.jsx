import Image from "next/image";
import React from "react";

const HeroCard = ({ imgSrc, title, desc, location }) => {
  return (
    <div
      className="flex flex-col justify-end h-[80vh] gap-32 bg-cover bg-center pl-16 md:pl-36 pr-14 pb-8"
      style={{ backgroundImage: `url(${imgSrc})` }}
    >
      <div className="flex flex-col gap-6">
        <p className="heading-1 text-white md:max-w-[60%]">{title}</p>
        <p className="feature-standard md:max-w-[60%]">{desc}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="caption-emphasis">Scroll down to discover more</p>
        <div className="w-full flex items-end justify-between">
          <a href={"#trips"}>
            <Image
              src={"/images/CarouselNext.png"}
              width={32}
              height={32}
              className="cursor-pointer hover-opacity"
            />
          </a>
          <div className="flex items-center gap-1 bg-neutral-100 rounded-md px-s py-xxs">
            <Image src={"/images/Icon-map.png"} width={16} height={16} />
            <p className="caption-accent text-secondary-1000">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
