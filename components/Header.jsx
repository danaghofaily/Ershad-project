"use client";
// import { menuItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import UserContext from "@/app/UserContext";

const Header = () => {

  const { menuItems, setMenuItems } = useContext(UserContext);
  const { userType } = useContext(UserContext);
  const { isloggedIn, setisLoggedIn } = useContext(UserContext);

  const menuItems2 = menuItems;

  return (
    <motion.nav
      className="wrapper flex items-center justify-between overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/home/${userType}`}>
        <Image
          src="/images/Logo.png"
          width={54}
          height={62}
          className="max-w-8 max-h-10 md:max-w-[54px] md:max-h-[62px] cursor-pointer"
          alt="Logo"
        />
      </Link>

      <div className="flex gap-6">
        <div className="flex items-center justify-between gap-20">
          <div className="hidden md:flex gap-20 items-center">
            {menuItems2.map((item) => {
              return (
                <Link href={`/${item}`} key={item}>
                  <p className="text-primary content-bold cursor-pointer hover-opacity">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {isloggedIn && (
        <Link href={`/`}>
          <button onClick={() => { setMenuItems([]), setisLoggedIn(false) }}>Logout</button>
        </Link>
      )}

    </motion.nav>
  );
};

export default Header;
