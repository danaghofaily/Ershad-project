"use client";
import React from "react";
import TripCard from "./TripCard";
import TripsCarousel from "./TripsCarousel";
import { motion } from "framer-motion";

const Trips = () => {
  return (
    <section className="w-full bg-neutral-700 py-16">
      <div className="wrapper flex flex-col gap-12 ">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="content-medium text-primary-100">Get inspired</p>
          <p className="heading-2 text-baseWhite">
            The best experience in Saudi
          </p>
        </motion.div>
        <motion.p
          className="content-regular text-neutral-100"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Browse our example of remarkable experiences along with tour local
          guides that surely make your visit to Saudi an unforgettable one
        </motion.p>
        <TripsCarousel />
      </div>
    </section>
  );
};

export default Trips;
