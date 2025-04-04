"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/navbar.module.sass";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-screen-2xl px-20 py-15 mx-auto flex items-center justify-between">
      <div className="flex">

      <Link href="/">
        <Image
          src={"/icons/header-logo.svg"}
          alt="Ampersand Logo"
          width={100}
          height={100}
          className="w-16 h-auto"
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

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
              />
              <motion.div
                className={styles.dialog}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.menuItems}>
                  <div className="grid grid-cols-4 justify-between gap-4">
                    <a
                      href="#"
                      className="flex flex-col rounded-[10px] items-center px-20 py-8 text-white hover:bg-[#000000]/40"
                    >
                      <Image
                        src="/icons/home.svg"
                        alt="Home Icon"
                        width={100}
                        height={100}
                        className="lg:w-18 h-auto mb-1"
                      />
                      <span>Home</span>
                    </a>
                    <a
                      href="#"
                      className="flex flex-col rounded-[10px] items-center px-20 py-8 text-white hover:bg-[#000000]/40"
                    >
                      <Image
                        src="/icons/about.svg"
                        alt="Menu Item 2 Icon"
                        width={100}
                        height={100}
                        className="lg:w-18 h-auto mb-1"
                      />
                      <span>About Us</span>
                    </a>
                    <a
                      href="#"
                      className="flex flex-col rounded-[10px] items-center px-20 py-8 text-white hover:bg-[#000000]/40"
                    >
                      <Image
                        src="/icons/contact.svg"
                        alt="Menu Item 3 Icon"
                        width={100}
                        height={100}
                        className="lg:w-18 h-auto mb-1"
                      />
                      <span>Contact Us</span>
                    </a>
                    <a
                      href="#"
                      className="flex flex-col rounded-[10px] items-center px-20 py-8 text-white hover:bg-[#000000]/40"
                    >
                      <Image
                        src="/icons/careers.svg"
                        alt="Menu Item 4 Icon"
                        width={100}
                        height={100}
                        className="lg:w-18 h-auto mb-1"
                      />
                      <span>Careers</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
