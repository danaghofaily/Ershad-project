"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroCard from "./HeroCard";
import HeroSwiper from "./HeroSwiper";

const HeroSection = () => {
  return (
    <motion.section
      className="relative w-full max-w-7xl overflow-hidden"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0 }}
      viewport={{ once: true }}
    >
      {/* <HeroCard /> */}
      <HeroSwiper />
    </motion.section>
  );
};

export default HeroSection;
