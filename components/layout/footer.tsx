'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from '@/styles/footer.module.sass'

const Footer = () => {
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
    <footer className={`w-full ${styles.footer}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-12 ">
        <motion.div 
          className="flex flex-col lg:grid lg:grid-cols-3 justify-between items-start lg:items-center gap-6 lg:gap-12 mb-11"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Left Section - Logo and Description */}
          <motion.div 
            className="w-full col-span-1"
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
              className="text-[#AFAFAF] text-sm md:text-lg leading-relaxed lg:max-w-[320px]"
              variants={fadeInUp}
            >
              Ampersand helps well-funded startups scale smarter. Expert advice, strategic growth, and big results—right when it matters most.
            </motion.p>
          </motion.div>

          {/* Right Section - Grid Layout */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full col-span-2"
            variants={staggerChildren}
          >
            <div>
              <h3 className="text-white font-semibold mb-2 pb-2 border-b border-[#313534] text-[14px] md:text-[16px]">Startups</h3>
              <Link href="/#startup-services" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Vision Crafting</Link><br />
              <Link href="/#startup-services" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Exit Breakthrough</Link><br />
              <Link href="/#startup-services" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Scaling Fuel</Link>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 pb-2 border-b border-[#313534] text-[14px] md:text-[16px]">Investors</h3>
              <Link href="/#investor-services" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Exit Strategy</Link><br />
              <Link href="/#investor-services" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Portfolio Pulse</Link><br />
              <Link href="/#investor-services" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Liquidity Move</Link>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 pb-2 border-b border-[#313534] text-[14px] md:text-[16px]">Ampersand</h3>
              <Link href="/about" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">About Us</Link><br />
              <Link href="/careers" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Careers</Link><br />
              <Link href="/contact" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Contact Us</Link><br />
              <Link href="/responsible-ai" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Responsible AI</Link>
            </div>
            <div>
              <h3 className="text-white flex-shrink-0 text-nowrap font-semibold mb-2 pb-2 border-b border-[#313534] flex items-center gap-2 text-[14px] md:text-[16px]">
                <Image
                  src="/icons/neural-paths-banner.svg"
                  alt="Neural ARC Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                Neural ARC
              </h3>
              <span className="text-white text-[12px] md:text-[14px]">Neural NOD</span><br />
              <Link href="https://rovyk.com" target="_blank" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Rovyk</Link><br />
              <Link href="https://lawbit.ai" target="_blank" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Lawbit</Link><br />
              <Link href="/" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Spider</Link><br />
              <Link href="/" className="text-[#DCE0DFA1] hover:text-white text-[12px] md:text-[14px]">Kashew</Link>
            </div>
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
            <Link href="/terms" className="text-[#798682] underline hover:text-white transition-colors text-xs lg:text-base">
              Terms of use
            </Link>
            <span className="text-[#313534] font-bold">•</span>
            <Link href="/privacy" className="text-[#798682] underline hover:text-white transition-colors text-xs lg:text-base">
              Privacy Policy
            </Link>
          </motion.div>
          <motion.div 
            className="flex flex-shrink-0 text-nowrap items-center gap-2 text-[#AFAFAF] text-xs lg:text-base"
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