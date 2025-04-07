'use client'

import React from 'react'
import styles from '@/styles/hero-button.module.sass'
import cardStyles from '@/styles/about-card.module.sass'
import { motion } from 'framer-motion'
import Link from 'next/link'

const AboutHero = () => {
  return (
    <section className='min-h-[calc(100vh-192px)] px-4 flex flex-col space-y-5 lg:space-y-10 items-center justify-center'>
        <motion.div 
          className='flex flex-col gap-3 lg:gap-6 items-center justify-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.h1 
              className='text-xl lg:text-7xl font-semibold max-w-5xl py-6 text-center tracking-tight drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Empowering Growth Through Purpose & Innovation
            </motion.h1>
            <motion.p 
              className='text-center text-xs lg:text-xl max-w-4xl text-[#F8F8F8]/70'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              We simplify complexity and transform ideas into powerful solutions. With a culture rooted in creativity, collaboration, and purpose-driven growth, we empower businesses to scale, adapt, and succeed in an ever-evolving world.
            </motion.p>
        </motion.div>
        <motion.div
          className="w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
            <Link href="/contact">
              <motion.button 
                className={styles.heroButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                  Contact Us
              </motion.button>
            </Link>
        </motion.div>

        <motion.div 
          className={cardStyles.outerCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={cardStyles.innerCard}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <h2 className='text-sm lg:text-5xl font-semibold text-center text-white mb-6'>
              Innovation, Collaboration, and Purpose-Driven Impact
            </h2>
            <p className='text-xs lg:text-lg text-[#F8F8F8]/70 text-center max-w-5xl mx-auto'>
              We thrive for curiosity, creativity, and collaboration. Our culture is built on the foundation of innovation, where ideas turn into solutions that make a difference. We believe in ownership, transparency, and a shared vision for growth—both for our clients and ourselves. At Ampersand, every challenge is an opportunity, and every success is a collective win.
            </p>
          </motion.div>
        </motion.div>
    </section>
  )
}

export default AboutHero;