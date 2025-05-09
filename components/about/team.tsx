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
    name: 'Michael',
    image: '/about/02.png'
  },
  {
    id: 3,
    name: 'Reuben',
    image: '/about/03.png'
  },
  {
    id: 4,
    name: 'Sharon',
    image: '/about/04.png'
  },
  {
    id: 5,
    name: 'Sonal',
    image: '/about/05.png'
  },
  {
    id: 6,
    name: 'Nikhil',
    image: '/about/06.png'
  },
  {
    id: 7,
    name: 'Siddesh',
    image: '/about/07.png'
  },
  {
    id: 8,
    name: 'Yogesh',
    image: '/about/08.png'
  },
  {
    id: 9,
    name: 'Dinesh',
    image: '/about/09.png'
  },
  {
    id: 10,
    name: 'Pranav',
    image: '/about/10.png'
  },
  {
    id: 11,
    name: 'Vishal',
    image: '/about/11.png'
  },
  {
    id: 12,
    name: 'Aishwarya',
    image: '/about/12.png'
  },
  {
    id: 13,
    name: 'Komal',
    image: '/about/13.png'
  },
  {
    id: 14,
    name: 'Pratik',
    image: '/about/14.png'
  },
  {
    id: 15,
    name: 'Clair',
    image: '/about/15.png'
  },
  {
    id: 16,
    name: 'Sahil',
    image: '/about/16.png'
  },
  {
    id: 17,
    name: 'Aaron',
    image: '/about/17.png'
  },
  {
    id: 18,
    name: 'Michelle',
    image: '/about/18.png'
  },
  {
    id: 19,
    name: 'Aman',
    image: '/about/19.png'
  },
  {
    id: 20,
    name: 'Noeila',
    image: '/about/20.png'
  },
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