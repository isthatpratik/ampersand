import React from 'react'
import styles from '@/styles/hero-button.module.sass'

const HeroSection = () => {
  return (
    <section className='min-h-[calc(70vh-120px)] flex flex-col space-y-10 items-center justify-center'>
        <div className='flex flex-col gap-6 items-center justify-center'>
            <h1 className='text-7xl font-semibold max-w-5xl py-6 text-center tracking-tight drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]'>
            Where vision meets valuation, and ambition finds its exit
            </h1>
            <p className='text-center text-xl max-w-4xl text-[#F8F8F8]/70'>
            Helping investors and founders write the next chapter of success, with strategic exits, smart capital moves, and tailored growth solutions.
            </p>
        </div>
        <div>
            <button className={styles.heroButton}>
                Transform and Thrive with Ampersand
            </button>
        </div>
    </section>
  )
}

export default HeroSection;