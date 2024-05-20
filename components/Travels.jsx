"use client";
import React from "react";
import GuideCard from "./GuideCard";
import TravelCard from "./TravelCard";
import { motion } from "framer-motion";

const Travels = () => {
  return (
    <section>
      <div className="flex flex-col gap-16 wrapper">
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="content-medium text-secondary-1000">Travel in style</p>
          <p className="heading-2 text-primary-800">
            Find travel inspiration by style
          </p>
        </motion.div>
        <div
          id="travels"
          className="grid grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <TravelCard
              imgSrc="/images/Travel1.png"
              desc="Luxury family and friends private seascape adventures with a positive impact."
              title="Private seascape travel"
            />
          </motion.div>
          <motion.div
            className="mt-32"
            initial={{ opacity: 0, y: -300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <TravelCard
              imgSrc="/images/Travel2.png"
              desc="Quality time with family and friends, complete flexibility and exclusive use desert camps."
              title="Desert & Mountain adventure travel"
            />
          </motion.div>
          <motion.div
            className="-mt-10 md:-mt-0"
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <TravelCard
              imgSrc="/images/Travel3.png"
              desc="From guilt-free indulgence of a real adventure, we can help you plan your perfect city life escapade."
              title="Hassle & bustle of Saudi, city life travel"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Travels;
