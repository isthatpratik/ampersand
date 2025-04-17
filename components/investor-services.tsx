'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Image from 'next/image'
import styles from '@/styles/investor-cards.module.sass'
import { cn } from '@/lib/utils'
import MobileCarousel from './MobileCarousel'
import ContactPopup from './ContactPopup'
import buttonStyles from '@/styles/contact-form-buttons.module.sass'

const cardData = [
  {
    id: 1,
    icon: '/illustrations/vision-crafting.png',
    title: 'Vision Crafting',
    subtitle: 'Strategic Advisory',
    sectionTitle: 'Grow with Serial Entrepreneurs by Your Side',
    content: [
      {
        title: 'Strategic Growth Partnerships',
        description: 'We identify collaborations that drive synergy, optimize resources, and accelerate success.'
      },
      {
        title: 'Impact-Driven & Transparent Guidance',
        description: 'We only take on projects where we can add real value, focusing on meaningful KPIs over vanity metrics.'
      },
      {
        title: 'Vision to Execution',
        description: 'We refine your vision, craft strategic action plans, and position your business for scalable success.'
      },
      {
        title: 'Tailored Growth Roadmap',
        description: 'Backed by expert consultation and deep market analysis, we design strategies for market expansion, product development, and revenue acceleration.'
      }
    ]
  },
  {
    id: 2,
    icon: '/illustrations/exit-breakthrough.png',
    title: 'Exit Breakthrough',
    subtitle: 'Fast Exit',
    sectionTitle: 'Maximizing Returns for Early-Stage Investors',
    content: [
      {
        title: 'Strategic Exit Planning & Advisory',
        description: 'Personalized strategies aligned with your goals, including tax, legal, and post-exit support.'
      },
      {
        title: 'Robust Network Access',
        description: 'Leverage our network of buyers, PE firms, and investors for high-value exits.'
      },
      {
        title: 'Market & Company Analysis',
        description: 'Detailed insights to determine optimal timing and structure for secondary exits.'
      },
      {
        title: 'Seamless Transaction Management',
        description: 'Complete support from preparation to closing for smooth, efficient execution.'
      }
    ]
  },
  {
    id: 3,  
    icon: '/illustrations/scaling-fuel.png',
    title: 'Scaling Fuel',
    subtitle: 'Growth Capital',
    sectionTitle: 'Fueling Growth from Seed to Series A and Beyond',
    content: [
      {
        title: 'Founder-Focused Collaboration',
        description: 'We work closely with founders, ensuring alignment while we handle the heavy lifting.'
      },
      {
        title: 'Seamless Bridge Funding',
        description: 'Tailored interim financing solutions to keep momentum strong between funding rounds.'
      },
      {
        title: 'Flexible Short-Term Capital',
        description: 'Access to bridge loans and mezzanine financing with low risk and high adaptability.'
      },
      {
        title: 'End-to-End Funding Support',
        description: 'From financial planning to investor connections, we manage the process for fast, strategic funding.'
      }
    ]
  }
]

const InvestorServices = () => {
  const [expandedCard, setExpandedCard] = useState(1)
  const controls = useAnimation()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start("visible")
    }, 1000)

    return () => clearTimeout(timer)
  }, [controls])

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const handleContactClick = (service: string) => {
    setSelectedService(service)
    setIsPopupOpen(true)
  }

  return (
    <motion.section 
      id="investor-services"
      className='py-15 mx-auto flex flex-col gap-6'
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <div className='flex flex-col gap-3 lg:gap-6 items-center justify-center'>
        <h3 className='text-xl md:text-3xl lg:text-5xl font-semibold max-w-6xl mx-auto text-center bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent'>
          Smart capital moves for investors who think ahead
        </h3>
        <p className='text-xs md:text-sm lg:text-md text-center max-w-4xl mx-auto text-[#9B9B9B]'>
          Maximize your returns with seamless exits and strategic liquidity solutions. We help investors unlock capital efficiently and optimize portfolio transitions. Stay ahead with precision-driven strategies designed for sustainable growth.
        </p>
      </div>

      {/* Desktop Cards */}
      <motion.div 
        className={styles.cardsContainer}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <AnimatePresence>
          {cardData.map((card) => (
            <motion.div
              key={card.id}
              className={cn(styles.card, {
                [styles.expanded]: expandedCard === card.id,
                [styles.collapsed]: expandedCard !== card.id
              })}
              onClick={() => setExpandedCard(card.id)}
              variants={cardVariants}
              layout
              transition={{
                layout: { duration: 0.6, type: "spring" }
              }}
            >
              <motion.div className={styles.cardContent} layout>
                <motion.div className={styles.cardHeader} layout>
                  <motion.div layout="position" className={styles.cardIcon}>
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={300}
                      height={300}
                    />
                  </motion.div>
                  <motion.div layout="position" className={styles.cardTitleGroup}>
                    <motion.h4 className={styles.cardTitle}>
                      {card.title}
                    </motion.h4>
                    <motion.p className={styles.cardSubtitle}>
                      {card.subtitle}
                    </motion.p>
                  </motion.div>
                </motion.div>
                <motion.div
                  className={styles.expandedContent}
                  layout
                >
                  <h3 className={styles.sectionTitle}>{card.sectionTitle}</h3>
                  <div className={styles.listContainer}>
                    {card.content.map((item, index) => (
                      <div key={index} className={styles.listItem}>
                        {item.title} – <span className="text-[#AFB6B4]">{item.description}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className={`${buttonStyles.contactButton} mt-6 w-fit`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactClick(card.title);
                    }}
                  >
                    Get Started
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Carousel */}
      <MobileCarousel 
        cardData={cardData.map(card => ({
          ...card,
          onContactClick: () => handleContactClick(card.title)
        }))} 
      />

      <ContactPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        service={selectedService}
      />
    </motion.section>
  )
}

export default InvestorServices