'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Career', href: '/career' },
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
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <motion.div 
          className="grid grid-cols-2 justify-between items-center mb-11"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Left Section - Logo and Description */}
          <motion.div 
            className="border-[#353535] border-r pr-3"
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
                width={64}
                height={48}
                className="mb-6"
              />
            </motion.div>
            <motion.p 
              className="text-[#AFAFAF] text-lg leading-relaxed"
              variants={fadeInUp}
            >
              Ampersand helps well-funded startups scale smarter. Expert advice, strategic growth, and big results—right when it matters most.
            </motion.p>
          </motion.div>

          {/* Right Section - Navigation */}
          <motion.div 
            className="flex gap-16 h-full items-center justify-end"
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
                  className="text-white hover:text-[#35EEFC] transition-colors text-2xl font-semibold"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Section - Terms and Copyright */}
        <motion.div 
          className="flex justify-between items-center"
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
            className="flex items-center gap-2 text-[#AFAFAF]"
            variants={fadeIn}
          >
            <span>Copyright 2025. All rights reserved.</span>
            <span>Neural Paths</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer