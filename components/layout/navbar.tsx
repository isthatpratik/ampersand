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

  // Menu structure with three columns
  const menuStructure = {
    investors: {
      title: "Investors",
      items: [
        {
          icon: "/icons/exit-strategy.svg",
          label: "Exit Strategy",
          subLabel: "[ Monitoring & Reporting ]",
          href: "/#investor-services",
        },
        {
          icon: "/icons/portfolio.svg",
          label: "Portfolio Pulse",
          subLabel: "[ Strategic Advisory ]",
          href: "/#investor-services",
        },
        {
          icon: "/icons/liquidity.svg",
          label: "Liquidity Move",
          subLabel: "[ Secondary Buyouts ]",
          href: "/#investor-services",
        },
      ],
    },
    startups: {
      title: "Startups",
      items: [
        {
          icon: "/icons/vision.svg",
          label: "Vision Crafting",
          subLabel: "[ Strategic Advisory ]",
          href: "/#startup-services",
        },
        {
          icon: "/icons/exit-breakthrough.svg",
          label: "Exit Breakthrough",
          subLabel: "[ Fast Exit ]",
          href: "/#startup-services",
        },
        {
          icon: "/icons/scaling.svg",
          label: "Scaling Fuel",
          subLabel: "[ Growth Capital ]",
          href: "/#startup-services",
        },
      ],
    },
    contact: {
      title: "Contact Us",
      items: [
        {
          icon: "/icons/about.svg",
          label: "About Us",
          subLabel: "",
          href: "/about",
        },
        {
          icon: "/icons/careers.svg",
          label: "Careers",
          subLabel: "",
          href: "/careers",
        },
        {
          icon: "/icons/contact.svg",
          label: "Contact Us",
          subLabel: "",
          href: "/contact",
        },
      ],
    },
  };

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
            className="w-9 md:w-16 h-auto"
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
            <div className={styles.overlay} onClick={toggleMenu} />
            <div className={styles.dialog}>
              <div className={styles.menuItems}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                  {/* Startups Column */}
                  <div className="flex flex-col">
                    <h2 className="text-white text-xl md:text-2xl font-semibold mb-6 ml-6">
                      {menuStructure.startups.title}
                    </h2>
                    <div className="flex flex-col gap-1">
                      {menuStructure.startups.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-6 rounded-[10px] p-4 text-white hover:bg-[#1B1B1B]"
                          onClick={toggleMenu}
                        >
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Image
                              src={item.icon}
                              alt={`${item.label} Icon`}
                              width={100}
                              height={100}
                              priority
                              className="w-20 h-auto mt-5"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="font-medium text-xl">{item.label}</span>
                            <span className="text-[#AFAFAF] text-base mt-1">
                              {item.subLabel}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Investors Column */}
                  <div className="flex flex-col">
                    <h2 className="text-white text-xl md:text-2xl font-semibold mb-6 ml-6">
                      {menuStructure.investors.title}
                    </h2>
                    <div className="flex flex-col gap-1">
                      {menuStructure.investors.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-6 rounded-[10px] p-4 text-white hover:bg-[#1B1B1B]"
                          onClick={toggleMenu}
                        >
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Image
                              src={item.icon}
                              alt={`${item.label} Icon`}
                              width={100}
                              height={100}
                              priority
                              className="w-20 h-auto mt-5"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="font-medium text-xl">{item.label}</span>
                            <span className="text-[#AFAFAF] text-base mt-1">
                              {item.subLabel}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Contact Us Column */}
                  <div className="flex flex-col">
                    <h2 className="text-white text-xl md:text-2xl font-semibold mb-6 ml-6">
                      {menuStructure.contact.title}
                    </h2>
                    <div className="flex flex-col gap-1">
                      {menuStructure.contact.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-6 rounded-[10px] p-4 text-white hover:bg-[#1B1B1B]"
                          onClick={toggleMenu}
                        >
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Image
                              src={item.icon}
                              alt={`${item.label} Icon`}
                              width={100}
                              height={100}
                              priority
                              className="w-20 h-auto mt-5"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="font-medium text-xl">{item.label}</span>
                            {item.subLabel && (
                              <span className="text-[#AFAFAF] text-base mt-1">
                                {item.subLabel}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Banner with Join the Waitlist button */}
                <div className="mt-8 relative overflow-hidden rounded-[20px]">
                  <Image
                    src="/images/banner.png"
                    alt="Banner Background"
                    width={2000}
                    height={300}
                    className="w-full h-full object-cover absolute top-0 left-0"
                  />
                  <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <Image
                        src="/icons/neural-paths-banner.svg"
                        alt="Neural Paths Logo"
                        width={200}
                        height={50}
                        className="w-48 h-auto"
                      />
                      <p className="text-white text-lg max-w-2xl">
                        Neural Paths empowers businesses of all sizes with instant,
                        engineer-free AI insights and specialized MicroSaaS tools that
                        think, act, and evolve like your team.
                      </p>
                    </div>
                    <Link 
                      href="/waitlist" 
                      className={styles.waitlistButton}
                    >
                      Join the Waitlist <span className="ml-2">→</span>
                    </Link>
                  </div>
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