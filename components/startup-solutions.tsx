'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from '@/styles/investor-cards.module.sass'
import { cn } from '@/lib/utils'
import MobileCarousel from './MobileCarousel'
import ContactPopup from './ContactPopup'
import buttonStyles from '@/styles/contact-form-buttons.module.sass'

const cardData = [
  {
    id: 1,
    icon: '/illustrations/exit-strategy.png',
    title: 'Exit Strategy',
    subtitle: 'Portfolio Exit',
    sectionTitle: 'Strategic Exit Services for VCs and Investors',
    content: [
      {
        title: 'Underperforming Asset Solutions',
        description: 'Dispose of dormant or toxic assets quickly to regain liquidity and clean your portfolio.'
      },
      {
        title: 'Smart Exit Structuring',
        description: 'Expert legal and financial strategies for seamless, results-driven transactions.'
      },
      {
        title: 'Targeted Buyer Matching',
        description: 'Leverage our global network to find ideal buyers, acquirers, or partners.'
      },
      {
        title: 'Full-Service Exit Execution',
        description: 'From asset valuation to closing, we deliver discreet, end-to-end exit solutions.'
      }
    ]
  },
  {
    id: 2,
    icon: '/illustrations/portfolio-pulse.png',
    title: 'Portfolio Pulse',
    subtitle: 'Monitoring & Reporting',
    sectionTitle: 'Board Representation & Portfolio Monitoring Services',
    content: [
      {
        title: 'Active Board Representation',
        description: 'We advocate for your interests in boardrooms, driving strategic alignment and value creation.'
      },
      {
        title: 'Performance & Compliance Oversight',
        description: 'Ongoing reviews to track milestones, ensure regulatory compliance, and safeguard your investment.'
      },
      {
        title: 'Startup Health & Risk Alerts',
        description: 'Proactive monitoring and early warning system for potential issues.'
      },
      {
        title: 'Clear & Consistent Reporting',
        description: 'Transparent insights with concise updates on performance, progress, and risks.'
      }
    ]
  },
  {
    id: 3,
    icon: '/illustrations/liquidity-move.png',
    title: 'Liquidity Move',
    subtitle: 'Secondary Buyouts',
    sectionTitle: 'Secondary Buyout Services for Strategic Exits',
    content: [
      {
        title: 'Equity Sale & Liquidity Solutions',
        description: 'Sell your stake to new or existing investors for fast, efficient liquidity.'
      },
      {
        title: 'Cap Table Cleanup',
        description: 'Optimize ownership structures to simplify fundraising and operations.'
      },
      {
        title: 'Buyer Matching & Deal Execution',
        description: 'Tap into our network for qualified buyers and smooth, well-structured exits.'
      },
      {
        title: 'End-to-End Transaction Support',
        description: 'From planning to negotiation, we manage every step with speed and discretion.'
      }
    ]
  }
]

const StartupSolutions = () => {
  const [expandedCard, setExpandedCard] = useState(1)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

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

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      id="startup-services"
      className='py-6 lg:py-15 mx-auto flex flex-col gap-6 lg:min-h-[calc(80vh-192px)]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={sectionVariants}
    >
      <div className='flex flex-col gap-3 lg:gap-6 items-center justify-center'>
        <h3 className='text-xl lg:text-5xl md:text-3xl font-semibold max-w-6xl mx-auto text-center bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent'>
          Strategic exits and growth solutions for founders
        </h3>
        <p className='text-xs lg:text-md md:text-sm text-center max-w-4xl mx-auto text-[#9B9B9B]'>
          Maximize your returns with seamless exits and strategic liquidity solutions. We help investors unlock capital efficiently and optimize portfolio transitions. Stay ahead with precision-driven strategies designed for sustainable growth.
        </p>
      </div>

      {/* Desktop Cards */}
      <motion.div 
        className={styles.cardsContainer}
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
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

export default StartupSolutions 