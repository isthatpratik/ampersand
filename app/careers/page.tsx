'use client'

import React from 'react'
import Link from 'next/link'
import styles from '@/styles/careers.module.sass'

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
    experience: '1 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Business, Economics, or a related field',
    skills: ['Business Analysis', 'Data Analysis', 'Strategy Development']
  },
  {
    id: 'ma-specialist',
    title: 'M&A Specialist (Mergers & Acquisitions)',
    description: 'Identify and manage M&A opportunities while assisting in deal structuring and legal compliance.',
    experience: '1 yr',
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
    title: 'Full Stack Developer (CRM & Website)',
    description: 'Maintain and enhance the AI-powered CRM while optimizing website performance and functionality.',
    experience: '1 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Computer Science, Software Engineering, or a related field',
    skills: ['JavaScript', 'React', 'Node.js', 'Database Management']
  },
  {
    id: 'growth-marketer',
    title: 'Growth Marketer – Investor & Startup Outreach',
    description: 'Develop marketing strategies to attract startups and investors while managing digital marketing, events, and branding.',
    experience: '1 yr',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Marketing, Business, or a related field',
    skills: ['Digital Marketing', 'Content Strategy', 'Event Management', 'Branding']
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
          {jobListings.map((job, index) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CareersPage