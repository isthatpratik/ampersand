import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/investor-cards.module.sass'
import buttonStyles from '@/styles/contact-form-buttons.module.sass'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardData {
  id: number
  icon: string
  title: string
  subtitle: string
  sectionTitle: string
  content: Array<{
    title: string
    description: string
  }>
  onContactClick?: () => void
}

interface MobileCarouselProps {
  cardData: CardData[]
}

const MobileCarousel = ({ cardData }: MobileCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % cardData.length)
      }
    }, 5000) // Change card every 5 seconds

    return () => clearInterval(interval)
  }, [cardData.length, isPaused])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true) // Pause auto-scroll when user interacts
    
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false)
    }, 10000)
  }

  const card = cardData[currentSlide]

  return (
    <div className={styles.mobileCardsContainer}>
      <motion.div 
        className={styles.mobileCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={card.id}
      >
        <div className={styles.mobileCardContent}>
          <div className={styles.mobileCardHeader}>
            <div className={styles.mobileCardIcon}>
              <Image
                src={card.icon}
                alt={card.title}
                width={200}
                height={200}
              />
            </div>
            <div className={styles.mobileCardInfo}>
              <h4 className={styles.mobileCardTitle}>{card.title}</h4>
              <p className={styles.mobileCardSubtitle}>{card.subtitle}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-white mb-4">{card.sectionTitle}</h3>
            {card.content.map((item, index) => (
              <div key={index} className="mb-4 text-xs text-[#F8F8F8]">
                <strong>{item.title}</strong> – <span className="text-[#AFB6B4]">{item.description}</span>
              </div>
            ))}
            
            {card.onContactClick && (
              <button 
                className={`${buttonStyles.contactButton} mt-6 mx-auto w-fit`}
                onClick={(e) => {
                  e.stopPropagation();
                  card.onContactClick?.();
                }}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className={styles.carouselDots}>
        {cardData.map((_, index) => (
          <div
            key={index}
            className={cn(styles.carouselDot, {
              [styles.active]: currentSlide === index
            })}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileCarousel 