'use client'

import Image from 'next/image'
import styles from '@/styles/hero-button.module.sass'
import { motion } from 'framer-motion'

const NeuralPaths = () => {
  const stats = [
    {
      value: '14.3B',
      label: 'PARAMATERS',
      subtext: 'processed realtime'
    },
    {
      value: '8.7M',
      label: 'DATA POINTS',
      subtext: 'analyzed per second'
    },
    {
      value: '375,000+',
      label: 'NEURAL',
      subtext: 'decision nodes'
    },
    {
      value: '97.4%',
      label: 'PREDICTION ACCURACY',
      subtext: 'in core verticals'
    },
    {
      value: '29',
      label: 'MINUTE AVERAGE',
      subtext: 'input to actionable insight'
    },
    {
      value: '43%',
      label: 'AVERAGE IMPROVEMENT',
      subtext: 'decision outcomes'
    }
  ]

  const products = [
    {
      name: 'LawBit',
      description: 'AI for Legal Intelligence',
      icon: '/icons/lawbit.png'
    },
    {
      name: 'Rovyk',
      description: 'AI Powerhouse',
      icon: '/icons/rovyk.png'
    },
    {
      name: 'Kashew',
      description: 'AI for Invoicing',
      icon: '/icons/kashew.png'
    },
    {
      name: 'Spider',
      description: 'AI Pitch Deck Analyzer',
      icon: '/icons/spider.png'
    }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="w-full max-w-[1440px] mx-auto lg:px-6 py-12 lg:py-24 min-h-[calc(100vh-192px)]">
      {/* Top Section */}
      <motion.div 
        className="flex flex-col items-center gap-6 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div 
          className={styles.neuralPathsHeader}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/80 text-base">
            <span className='tracking-widest'>NEURAL PATHS</span> an <span className='font-bold'>AI venture</span> by <span className='font-bold'>Ampersand</span>
          </p>
        </motion.div>
        <motion.h2 
          className="text-xl lg:text-6xl font-semibold text-white"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          from data to decisions, naturally.
        </motion.h2>
        <motion.p 
          className="text-base lg:text-xl text-[#AFAFAF]"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          Where neural intelligence transforms insight into action
        </motion.p>
      </motion.div>

      {/* Main Grid Section */}
      <motion.div 
        className="grid lg:grid-cols-3 gap-5 items-center mb-16 lg:mb-32 md:px-12 px-0 lg:px-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 border border-[#282828] overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="p-4 lg:p-8 flex items-center justify-center flex-col gap-1 border-r border-b border-[#282828] even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0"
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-sm lg:text-2xl font-semibold text-white text-center drop-shadow-[0_0_21px_rgba(255,255,255,0.5)]">
                {stat.value}
              </div>
              <div className="text-[8px] lg:text-xs text-white font-semibold text-center tracking-wider text-nowrap">
                {stat.label}
              </div>
              <div className="text-[8px] lg:text-xs text-[#798682] text-center">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Middle Image */}
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/images/neural-paths.png"
              alt="Neural Paths"
              width={400}
              height={400}
              className="lg:w-full lg:h-full object-contain drop-shadow-[0_0_48px_rgba(255,255,255,0.2)] p-12 -mt-6 lg:-mt-16"
            />
            <motion.p 
              className="tracking-[0.2em] text-base -mt-22 text-[#F8F8F8]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              NEURAL PATHS
            </motion.p>
          </div>
        </motion.div>

        {/* Right Text */}
        <motion.div 
          className="flex flex-col items-start justify-center px-3 lg:mt-0 mt-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-xl lg:text-[32px] font-semibold text-white mb-3 lg:mb-6"
            variants={fadeInUp}
          >
            DataNeuron - AI Platform
          </motion.h3>
          <motion.p 
            className="text-xs lg:text-base text-[#798682] leading-normal lg:max-w-sm"
            variants={fadeInUp}
          >
            Our platform integrates with existing systems, transforming data into insights through neural networks and machine learning, empowering users with a code-free interface that democratizes access to analytics—without the overhead of specialized teams, enabling organizations to implement AI-driven decision-making quickly.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Micro SaaS Suite Section */}
      <motion.div 
        className="flex flex-col items-center gap-8 lg:gap-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-xl lg:text-5xl font-semibold text-white text-center"
          variants={fadeInUp}
        >
          Neural Paths&apos; - Micro SaaS Suite
        </motion.h2>
        
        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
          variants={staggerContainer}
        >
          {products.map((product, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center gap-4"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div 
                className="w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={product.icon}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <h4 className="text-sm lg:text-2xl font-semibold text-white">
                {product.name}
              </h4>
              <p className="text-[#798682] lg:text-base text-sm text-center">
                {product.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Visit Button */}
        <motion.button 
          className={styles.visitButton}
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Visit neuralpaths.ai
          <Image
            src="/icons/neural-paths.svg"
            alt="Neural Icon"
            width={42}
            height={42}
            className="inline-block ml-3"
          />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default NeuralPaths;