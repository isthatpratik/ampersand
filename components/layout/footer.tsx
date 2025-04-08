'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }

  return (
    <footer className="w-full bg-[#000000]">
      <div className="max-w-[1440px] mx-auto px-6 lg:py-12 py-6">
        <motion.div 
          className="flex flex-col lg:grid lg:grid-cols-2 justify-between items-start lg:items-center gap-12 lg:gap-0 mb-11"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Left Section - Logo and Description */}
          <motion.div 
            className="w-full lg:border-r lg:border-[#353535] lg:pr-3"
            variants={fadeInUp}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image
                src="/icons/header-logo.svg"
                alt="Ampersand Logo"
                width={100}
                height={100}
                className="mb-6 lg:w-[64px] lg:h-[48px] w-[62px] h-[34px]"
              />
            </motion.div>
            <motion.p 
              className="text-[#AFAFAF] text-lg leading-relaxed lg:max-w-[460px]"
              variants={fadeInUp}
            >
              Ampersand helps well-funded startups scale smarter. Expert advice, strategic growth, and big results—right when it matters most.
            </motion.p>
          </motion.div>

          {/* Right Section - Navigation */}
          <motion.div 
            className="grid grid-cols-2 gap-y-8 w-full lg:flex lg:gap-16 lg:h-full lg:items-center lg:justify-end"
            variants={staggerChildren}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                variants={{
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-white hover:text-[#35EEFC] transition-colors text-xl lg:text-2xl font-semibold"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Section - Terms and Copyright */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 pt-6 border-t border-[#353535]"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div 
            className="flex gap-3"
            variants={fadeIn}
          >
            <Link href="/terms" className="text-[#798682] underline hover:text-white transition-colors">
              Terms of use
            </Link>
            <span className="text-[#313534] font-bold">•</span>
            <Link href="/privacy" className="text-[#798682] underline hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </motion.div>
          <motion.div 
            className="flex flex-shrink-0 text-nowrap items-center gap-2 text-[#AFAFAF] text-sm lg:text-base"
            variants={fadeIn}
          >
            <span>Copyright 2025. All rights reserved.</span>
            <span>Ampersand</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer