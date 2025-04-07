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
    id: 'venture-analyst',
    title: 'Venture Analyst',
    description: 'Conduct market research, analyze startup business models and financials, and assist in due diligence for VC clients.',
    experience: '2 yrs',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Related Field',
    skills: ['Financial Analysis', 'Market Research', 'Due Diligence']
  },
  {
    id: 'ma-specialist',
    title: 'M&A Specialist (Mergers & Acquisitions)',
    description: 'Identify and manage M&A opportunities while assisting in deal structuring and legal compliance.',
    experience: '2 yrs',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Related Field',
    skills: ['Financial Analysis', 'Market Research', 'Due Diligence']
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    description: 'Develop and enhance AI-powered investor-startup matching and predictive analytics for deal flow and portfolio health.',
    experience: '2 yrs',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Related Field',
    skills: ['Financial Analysis', 'Market Research', 'Due Diligence']
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer (CRM & Website)',
    description: 'Maintain and enhance the AI-powered CRM while optimizing website performance and functionality.',
    experience: '2 yrs',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Related Field',
    skills: ['Financial Analysis', 'Market Research', 'Due Diligence']
  },
  {
    id: 'growth-marketer',
    title: 'Growth Marketer – Investor & Startup Outreach',
    description: 'Develop marketing strategies to attract startups and investors while managing digital marketing, events, and branding.',
    experience: '2 yrs',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Related Field',
    skills: ['Financial Analysis', 'Market Research', 'Due Diligence']
  },
  {
    id: 'ai-research-intern',
    title: 'AI Research Intern – VC & Startup Intelligence',
    description: 'Conduct AI-driven research, develop evaluation models, and analyze data to provide insights for startup assessment and financial forecasting.',
    experience: '2 yrs',
    location: 'In-Office',
    employmentType: 'Full-time',
    education: 'Related Field',
    skills: ['Financial Analysis', 'Market Research', 'Due Diligence']
  }
]

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className={styles.jobCardOuter}>
      <div className={styles.jobCard}>
        <div className={styles.jobContent}>
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
              <span className={styles.jobDetailLabel}>Employment type:</span>
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

          <Link href={`/careers/apply?role=${job.title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.applyButton}>
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  )
}

const CareersPage = () => {
  return (
    <div className="min-h-screen w-full py-24 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center gap-6 mb-16">
          <h1 className="text-5xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]">
            Join Our Team
          </h1>
          <p className="text-[#9B9B9B] text-center max-w-4xl">
            At Ampersand, we are committed to driving business growth through strategic financial solutions. If you&apos;re passionate about finance, strategy, and helping businesses thrive, we&apos;d love to have you on board.
          </p>
        </div>

        <div className={styles.jobGrid}>
          {jobListings.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CareersPage