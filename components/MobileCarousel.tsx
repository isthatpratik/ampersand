import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/investor-cards.module.sass'
import { cn } from '@/lib/utils'

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
}

interface MobileCarouselProps {
  cardData: CardData[]
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ cardData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % cardData.length)
      }
    }, 5000) // Change card every 5 seconds

    return () => clearInterval(interval)
  }, [cardData.length, isPaused])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsPaused(true) // Pause auto-scroll when user interacts
    
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false)
    }, 10000)
  }

  return (
    <div 
      className={styles.mobileCardsContainer}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        // Resume auto-scroll after 10 seconds of inactivity
        setTimeout(() => {
          setIsPaused(false)
        }, 10000)
      }}
    >
      <div className={styles.mobileCard}>
        <div className={styles.mobileCardContent}>
          <div className={styles.mobileCardHeader}>
            <div className={styles.mobileCardIcon}>
              <Image
                src={cardData[currentIndex].icon}
                alt={cardData[currentIndex].title}
                width={200}
                height={200}
              />
            </div>
            <div className={styles.mobileCardInfo}>
              <h4 className={styles.mobileCardTitle}>
                {cardData[currentIndex].title}
              </h4>
              <p className={styles.mobileCardSubtitle}>
                {cardData[currentIndex].subtitle}
              </p>
            </div>
          </div>
          <div>
            <h3 className={styles.mobileCardTitle}>
              {cardData[currentIndex].sectionTitle}
            </h3>
            <div className={styles.mobileCardDescription}>
              {cardData[currentIndex].content.map((item, index) => (
                <div key={index} className="mb-4">
                  <strong>{item.title}</strong> – {item.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.carouselDots}>
        {cardData.map((_, index) => (
          <button
            key={index}
            className={cn(styles.carouselDot, {
              [styles.active]: currentIndex === index,
            })}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileCarousel 