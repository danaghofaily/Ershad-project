"use client";
import { trips } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import TripCard from "./TripCard";
import useMeasure from "react-use-measure";
import { animate, motion, useMotionValue } from "framer-motion";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Parallax,
} from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";

const TripsCarousel = () => {
  let [ref, { width }] = useMeasure();
  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;
  const [duration, setDuration] = useState(FAST_DURATION);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isMobilesm = useMediaQuery({ query: "(max-width: 620px)" });
  const isMobilePlus = useMediaQuery({ query: "(max-width: 750px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 940px)" });

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -width - 180;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 100,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    // if (mustFinish) {
    //   controls = animate(xTranslation, [0, finalPosition], {
    //     ease: "linear",
    //     duration: duration * (1 - xTranslation.get() / finalPosition),
    //     onComplete: () => {
    //       setMustFinish(false);
    //       setRerender(!rerender);
    //     },
    //   });
    // } else {
    //   controls = animate(xTranslation, [0, finalPosition], {
    //     ease: "linear",
    //     duration: duration,
    //     repeat: Infinity,
    //     repeatType: "loop",
    //     repeatDelay: 0,
    //   });
    // }

    return controls.stop;
  }, [xTranslation, width, duration, rerender]);

  return (
    <motion.div
      id="trips"
      className="relative overflow-hidden"
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex gap-8"
        ref={ref}
        // style={{ x: xTranslation }}
        // onHoverStart={() => {
        //   setMustFinish(true);
        //   setDuration(SLOW_DURATION);
        // }}
        // onHoverEnd={() => {
        //   setMustFinish(true);
        //   setDuration(FAST_DURATION);
        // }}
      >
        <Swiper
          spaceBetween={30}
          slidesPerView={
            isMobile
              ? 1.2
              : isMobilesm
              ? 1.5
              : isMobilePlus
              ? 1.9
              : isTablet
              ? 2.5
              : 3
          }
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          freeMode={true}
          style={{
            "--swiper-navigation-color": "#cccbcb",
            "--swiper-pagination-color": "#cccbcb",
          }}
          //   navigation={true}
          parallax={true}
          speed={4000}
          modules={[Parallax, Autoplay, Pagination, Navigation, FreeMode]}
        >
          {[...trips].map((item, idx) => (
            <SwiperSlide>
              <div className="">
                <TripCard
                  key={idx}
                  imgSrc={item.imgSrc}
                  name={item.name}
                  info={item.info}
                  location={item.location}
                  desc={item.desc}
                  price={item.price}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default TripsCarousel;
