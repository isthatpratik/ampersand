'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from '@/styles/investor-cards.module.sass'
import { cn } from '@/lib/utils'

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

  return (
    <section className='py-15 mx-auto flex flex-col gap-6'>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <h3 className='text-5xl font-semibold max-w-6xl mx-auto text-center'>
          Smart capital moves for investors who think ahead
        </h3>
        <p className='text-md text-center max-w-4xl mx-auto'>
          Maximize your returns with seamless exits and strategic liquidity solutions. We help investors unlock capital efficiently and optimize portfolio transitions. Stay ahead with precision-driven strategies designed for sustainable growth.
        </p>
      </div>
      <div className={styles.cardsContainer}>
        <AnimatePresence>
          {cardData.map((card) => (
            <motion.div
              key={card.id}
              className={cn(styles.card, {
                [styles.expanded]: expandedCard === card.id,
                [styles.collapsed]: expandedCard !== card.id
              })}
              onClick={() => setExpandedCard(card.id)}
              layout
              transition={{
                layout: { duration: 0.6, type: "spring" }
              }}
            >
              <motion.div className={styles.cardContent} layout>
                <motion.div className={styles.cardHeader} layout>
                  <motion.div layout="position" className={styles.cardNumber}>
                    {card.id}
                  </motion.div>
                  <motion.div layout="position" className={styles.cardIcon}>
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={300}
                      height={300}
                    />
                  </motion.div>
                  <motion.h4 layout="position" className={styles.cardTitle}>
                    {card.title}
                  </motion.h4>
                  <motion.p layout="position" className={styles.cardSubtitle}>
                    {card.subtitle}
                  </motion.p>
                </motion.div>
                <motion.div
                  className={styles.expandedContent}
                  layout
                >
                  <h3 className={styles.sectionTitle}>{card.sectionTitle}</h3>
                  <div className={styles.listContainer}>
                    {card.content.map((item, index) => (
                      <div key={index} className={styles.listItem}>
                        <div>
                          <div className={styles.listItemTitle}>{item.title}<div className={styles.listItemDescription}>{item.description}</div></div>
                          
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default InvestorServices