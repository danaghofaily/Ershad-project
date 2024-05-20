import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../app/globals.css";
import HeroCard from "./HeroCard";
import { herocards } from "@/constants";

const HeroSwiper = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{
          "--swiper-navigation-color": "#cccbcb",
          "--swiper-pagination-color": "#cccbcb",
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        parallax={true}
        speed={1000}
        modules={[Parallax, Autoplay, Pagination, Navigation]}
      >
        {herocards.map((item) => (
          <SwiperSlide>
            <HeroCard
              imgSrc={item.imgSrc}
              title={item.title}
              desc={item.desc}
              location={item.location}
            />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
          <HeroCard
            imgSrc={"/images/Cover7.png"}
            title="Experience the beauty of Saudi with us"
            desc="Discover the stunning beauty of Saudi Arabia with our exclusive tour
          packages."
            location="Alula"
          />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default HeroSwiper;
