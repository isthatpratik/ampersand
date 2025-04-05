'use client'

import React from 'react'
import styles from '@/styles/hero-button.module.sass'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className='min-h-[calc(100vh-192px)] flex flex-col space-y-10 items-center justify-center -mt-[192px]'>
        <motion.div 
          className='flex flex-col gap-6 items-center justify-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.h1 
              className='text-7xl font-semibold max-w-5xl py-6 text-center tracking-tight drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Where vision meets valuation, and ambition finds its exit
            </motion.h1>
            <motion.p 
              className='text-center text-xl max-w-4xl text-[#F8F8F8]/70'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Helping investors and founders write the next chapter of success, with strategic exits, smart capital moves, and tailored growth solutions.
            </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
            <motion.button 
              className={styles.heroButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
                Transform and Thrive with Ampersand
            </motion.button>
        </motion.div>
    </section>
  )
}

export default HeroSection;