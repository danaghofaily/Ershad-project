"use client"
import Image from "next/image";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import UserContext from "@/app/UserContext";

const PlanningService = () => {
  const router = useRouter();
  const { userType } = useContext(UserContext);

  const handleDiscoverMore = () => {
    if (userType === "tourist") {
      router.push("/destinations");
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-16 wrapper">
        <motion.div
          id="planning"
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="content-regular text-secondary-1000">
            Tailor-made services for you
          </p>
          <p className="heading-2 text-primary-800">
            Travel planning services <br /> throughout Saudi Arabia
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 200, x: -100 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image src={"/images/Planning1.png"} width={370} height={440} />
          </motion.div>
          <motion.div
            className="flex flex-col gap-8 mx-auto"
            initial={{ opacity: 0, y: 200, x: 100 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="content-medium text-secondary-1000">
              Tailor-made services for you
            </p>
            <p className="heading-3 text-primary-800">
              Custom <br /> Designated Travel
            </p>
            <p className="content-regular text-secondary-1000">
              Every aspect of your trip to Saudi Arabia will be <br /> custom
              designed to match your interests and <br /> budget.
            </p>
            <button className="btn-primary w-fit text-white mt-8" onClick={handleDiscoverMore}>
              Discover more
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlanningService;
