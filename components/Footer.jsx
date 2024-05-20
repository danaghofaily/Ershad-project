import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-primary mt-60 overflow-hidden">
      <div className="wrapper flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-8 py-16 w-full">
          <div className="flex flex-col flex-1 gap-16 md:gap-8">
            <p className="semibold-12 text-baseWhite">HOW IT WORKS</p>
            <p className="highlight-bold text-baseWhite">The process</p>
            <p className="highlight-bold text-baseWhite">How to plan</p>
            <p className="highlight-bold text-baseWhite">
              How to Apply for a tour guide
            </p>
          </div>
          <div className="flex flex-col gap-8 flex-1">
            <p className="semibold-12 text-baseWhite uppercase">
              top destinations
            </p>
            <p className="highlight-bold text-baseWhite">Riyadh</p>
            <p className="highlight-bold text-baseWhite">Alula</p>
          </div>

          <div className="flex flex-col flex-1 gap-8">
            <p className="semibold-12 text-baseWhite uppercase">about ershad</p>
            <p className="highlight-bold text-baseWhite">The Ershad story</p>
            <p className="highlight-bold text-baseWhite">
              Our philosophy for travel
            </p>
            <p className="highlight-bold text-baseWhite">Help & Support</p>
          </div>
          <div className="flex flex-col gap-8 flex-1">
            <p className="semibold-12 text-baseWhite uppercase">
              top experiences
            </p>
            <p className="highlight-bold text-baseWhite">Desert safari </p>
            <p className="highlight-bold text-baseWhite">
              Heritage and Culture in Saudi
            </p>
            <p className="highlight-bold text-baseWhite">
              Midnight souq shopping
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-8 self-center">
            <p className="semibold-12 text-baseWhite uppercase">social</p>
            <div className="flex gap-8 items-center">
              <Image src={"/images/Facebook.png"} width={24} height={24} />
              <Image src={"/images/X.png"} width={24} height={24} />
              <Image src={"/images/Insta.png"} width={24} height={24} />
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-8 mt-16 md:mt-32">
            <p className="btn-white w-fit">Inquire travel experiences</p>
          </div>
          <div className="flex flex-col gap-8 flex-1 mt-16 md:mt-32">
            <p className="semibold-12 text-baseWhite uppercase">CALL US</p>
            <p className="highlight-bold text-baseWhite">+971 23490945</p>
          </div>
          <div className="flex flex-col gap-8 grow mt-16 md:mt-32">
            <p className="semibold-12 text-baseWhite uppercase">EMAIL US</p>
            <p className="highlight-bold text-baseWhite">
              ershadtravels@gmail.com
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-12 pb-6 border-t border-primary-800">
          <p className="content-regular text-neutral-200">
            Ⓒ 2024 Ershad. All rights reserved.
          </p>
          <div className="flex items-center gap-16">
            <p className="content-regular text-neutral-200">Terms & Service</p>
            <p className="content-regular text-neutral-200">Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
