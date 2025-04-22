'use client'

import React from 'react'
import Link from 'next/link'
import styles from '@/styles/careers.module.sass'
import { motion } from 'framer-motion'
import cardStyles from '@/styles/about-card.module.sass'

interface Job {
  id: string
  title: string
  description: string
  experience: string
  location: string
  employmentType: string
  education: string
  skills: string[]
}

interface JobCardProps {
  job: Job
}

const jobListings = [
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Conduct market research, analyze business models and financials, and assist in strategic decision-making for business growth.',
    experience: '2 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Business, Economics, or a related field',
    skills: ['Business Analysis', 'Data Analysis', 'Strategy Development']
  },
  {
    id: 'ma-specialist',
    title: 'M&A Specialist (Mergers & Acquisitions)',
    description: 'Identify and manage M&A opportunities while assisting in deal structuring and legal compliance.',
    experience: '2 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Business, Finance, or a related field',
    skills: ['Financial Analysis', 'M&A Strategy', 'Legal Compliance']
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    description: 'Develop and enhance AI-powered investor-startup matching and predictive analytics for deal flow and portfolio health.',
    experience: '1 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Computer Science, Engineering, or a related field',
    skills: ['Machine Learning', 'Artificial Intelligence', 'Predictive Analytics']
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Design and develop scalable web applications with modern technologies, focusing on responsive interfaces and secure back-end services.',
    experience: '1 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Computer Science, Software Engineering, or a related field',
    skills: ['JavaScript', 'React', 'Node.js', 'Database Management', 'AWS', 'Python', 'RestAPI']
  },
  {
    id: 'creative-designer',
    title: 'Creative Designer (Graphic & UI/UX)',
    description: 'Design engaging visuals and user interfaces for both digital and print. Collaborate across teams to maintain a consistent brand experience.',
    experience: '6 months',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Bachelor of Design',
    skills: ['Figma', 'Illustrator', 'Photoshop', 'After Effects']
  },
  {
    id: 'ai-research-intern',
    title: 'AI Research Intern – VC & Startup Intelligence',
    description: 'Conduct AI-driven research, develop evaluation models, and analyze data to provide insights for startup assessment and financial forecasting.',
    experience: '1 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Computer Science, Data Science, or a related field',
    skills: ['Machine Learning', 'Data Analysis', 'Research Methodology']
  }
]

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className={`${styles.jobCardOuter} animate-fade-in-delay-2`}>
      <div className={`${styles.jobCard} animate-slide-up-delay-2`}>
        <div className={styles.jobContent}>
          <div className={styles.jobContentTop}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobDescription}>{job.description}</p>
          
            <div className={styles.jobDetailsGrid}>
              <div className={styles.jobDetailCard}>
                <span className={styles.jobDetailLabel}>Experience:</span>
                <span className={styles.jobDetailValue}>{job.experience}</span>
              </div>
              
              <div className={styles.jobDetailCard}>
                <span className={styles.jobDetailLabel}>Location:</span>
                <span className={styles.jobDetailValue}>{job.location}</span>
              </div>
              
              <div className={styles.jobDetailCard}>
                <span className={styles.jobDetailLabel}>Employment:</span>
                <span className={styles.jobDetailValue}>{job.employmentType}</span>
              </div>
              
              <div className={styles.jobDetailCard}>
                <span className={styles.jobDetailLabel}>Education:</span>
                <span className={styles.jobDetailValue}>{job.education}</span>
              </div>
            </div>

            <div className={styles.skillsSection}>
              <span className={styles.skillsLabel}>Skills</span>
              <div className={styles.skillsList}>
                {job.skills.join(', ')}
              </div>
            </div>
          </div>

          <Link href="/careers/apply" className={styles.applyButton}>
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  )
}

const CareersPage = () => {
  return (
    <div className="w-full px-6 mb-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center gap-6 mb-16 animate-fade-in">
          <h1 className="text-3xl lg:text-7xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)] animate-slide-up">
            Join Our Team
          </h1>
          <p className="text-[#F8F8F8B2] text-center text-sm max-w-6xl lg:text-xl animate-slide-up-delay-1">
            At Ampersand, we are committed to driving business growth through strategic financial solutions. If you&apos;re passionate about finance, strategy, and helping businesses thrive, we&apos;d love to have you on board.
          </p>
        </div>

        <div className={styles.jobGrid}>
          {jobListings.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <motion.div 
          className={cardStyles.outerCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={cardStyles.innerCard}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <div className={cardStyles.topText}>
              <h3 className="text-lg lg:text-2xl font-medium">Join Our Team</h3>
              <p className="text-sm lg:text-base text-[#F8F8F8B2] mt-2">
                Be part of a dynamic team that&apos;s changing the future
              </p>
            </div>
            
            <h2 className='text-sm lg:text-5xl font-semibold text-center text-white mb-6'>
              Innovation, Collaboration, and Purpose-Driven Impact
            </h2>
            <p className='text-xs lg:text-lg text-[#F8F8F8]/70 text-center max-w-5xl mx-auto'>
              We thrive for curiosity, creativity, and collaboration. Our culture is built on the foundation of innovation, where ideas turn into solutions that make a difference. We believe in ownership, transparency, and a shared vision for growth—both for our clients and ourselves. At Ampersand, every challenge is an opportunity, and every success is a collective win.
            </p>
            
            <div className="mt-8 text-center">
              <p className="text-sm lg:text-xl text-[#F8F8F8B2]">
                Send your applications to{' '}
                <a 
                  href="mailto:careers@ampvc.co" 
                  className="text-white hover:text-[#F8F8F8B2] transition-colors"
                >
                  careers@ampvc.co
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default CareersPage