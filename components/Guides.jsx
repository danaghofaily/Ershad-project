"use client";
import GuideCard from "./GuideCard";
import { motion } from "framer-motion";

const Guides = () => {
  return (
    <section>
      <div className="flex flex-col gap-24 wrapper">
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="content-medium text-secondary-1000">
            Service at its best
          </p>
          <p className="heading-2 text-primary-800 max-w-[60%]">
            Enjoy your worry-free travel with our five star service local guides
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-10">
          <motion.div
            className="md:mt-48"
            initial={{ opacity: 0, y: -500 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <GuideCard
              imgSrc="/images/Guide4.png"
              name="Mawi"
              info="Male, 24 years old"
              location="Riyadh & Alula"
              desc="Loves to showcase the local cuisine, city life, and the culture of Saudi Arabia"
            />
          </motion.div>

          <motion.div
            className="mt-48 md:mt-0"
            initial={{ opacity: 0, y: 500 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <GuideCard
              imgSrc="/images/Guide5.png"
              name="Abdullah Ali"
              info="Male, lives in Saudi"
              location="Riyadh"
              desc="Enjoy the hassle of city life but also she’ll tour you around in the center of the Desert experience"
            />
          </motion.div>
          <motion.div
            className="-mt-14 md:mt-48"
            initial={{ opacity: 0, y: -500 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <GuideCard
              imgSrc="/images/Guide6.png"
              name="Moh'd"
              info="Male, lives in Saudi since birth"
              location="Al-Kobr"
              desc="Enjoy the hassle of city life but also she’ll tour you around in the center of the Desert experience"
            />
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col gap-4 items-center"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="btn-primary w-fit">
            View all available local tour guides
          </p>
          <p className="caption-accent text-neutral-800">
            Are you a local? Do you want to be our local tour guide? Apply today
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Guides;
