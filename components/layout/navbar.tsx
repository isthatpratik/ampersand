"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/navbar.module.sass";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: "/icons/home.svg", label: "Home", href: "/" },
    { icon: "/icons/about.svg", label: "About Us", href: "/about" },
    { icon: "/icons/contact.svg", label: "Contact Us", href: "/contact" },
    { icon: "/icons/careers.svg", label: "Careers", href: "/careers" }
  ];

  return (
    <motion.div 
      className="max-w-screen-2xl px-8 lg:px-20 py-8 lg:py-15 mx-auto flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex">
        <Link href="/">
          <Image
            src={"/icons/header-logo.svg"}
            alt="Ampersand Logo"
            width={100}
            height={100}
            className="w-9 lg:w-16 h-auto"
          />
        </Link>
      </div>
      <div>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className={styles.menuSquare}>
            <div className={styles.menuCircle}>
              <div className={cn(styles.menuLine, { [styles.open]: isOpen })} />
              <div className={cn(styles.menuLine, { [styles.open]: isOpen })} />
            </div>
          </div>
        </button>

        {isOpen && (
          <>
            <div
              className={styles.overlay}
              onClick={toggleMenu}
            />
            <div className={styles.dialog}>
              <div className={styles.menuItems}>
                <div className="grid grid-cols-4 justify-between gap-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex flex-col rounded-[10px] items-center px-4 py-4 lg:px-20 lg:py-8 text-white hover:bg-[#000000]/40"
                      onClick={toggleMenu}
                    >
                      <div>
                        <Image
                          src={item.icon}
                          alt={`${item.label} Icon`}
                          width={100}
                          height={100}
                          className="w-7 lg:w-18 h-auto mb-1"
                        />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
