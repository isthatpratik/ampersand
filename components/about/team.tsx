'use client'

import React from 'react'
import Image from 'next/image'
import styles from '@/styles/team-card.module.sass'
import { motion } from 'framer-motion'

const teamMembers = [
  {
    id: 1,
    name: 'Aniket',
    image: '/about/01.png'
  },
  {
    id: 2,
    name: 'Sarah',
    image: '/about/02.png'
  },
  {
    id: 3,
    name: 'Michael',
    image: '/about/03.png'
  },
  {
    id: 4,
    name: 'Sharon',
    image: '/about/04.png'
  }
]

const Team = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className={styles.teamSection}>
      <h3 className="text-4xl font-semibold text-center mb-12">Meet our Team</h3>
      <motion.div 
        className={styles.teamGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {teamMembers.map((member) => (
          <motion.div 
            key={member.id}
            className={styles.teamCard}
            variants={cardVariants}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                priority
              />
              <h4 className={styles.memberName}>{member.name}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Team;