'use client'

import React from 'react'
import { motion } from 'framer-motion'

const ResponsibleAI = () => {
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

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="w-full lg:py-24 py-12">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-20">
        <motion.div 
          className="flex flex-col items-center gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-3xl lg:text-7xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]">
            Responsible AI
          </h1>
          <p className="text-[#9B9B9B] text-center text-sm lg:text-xl max-w-4xl">
            Building ethical, transparent, and fair AI solutions for startups and investors
          </p>
        </motion.div>

        <motion.div
          className="bg-[#1A1A1A] rounded-3xl p-4 lg:p-12"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-[#F8F8F8B2] mb-8">
              At Ampersand, we are dedicated to building and deploying AI solutions that drive growth for startups and investors while maintaining the highest standards of ethics, transparency, and fairness. Our commitment to Responsible AI is deeply embedded in our technology, services, and decision-making processes.
            </p>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Ethical AI Matching for Startups & Investors</h2>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-4">
                  <strong>Bias-Free Recommendations:</strong> Our AI matching tool connects startups with the most suitable investors using objective criteria such as industry focus, growth stage, and funding history. We regularly audit our algorithms to identify and eliminate any biases.
                </li>
                <li className="mb-4">
                  <strong>Inclusive Opportunities:</strong> We ensure that startups from diverse backgrounds have equitable access to funding opportunities by maintaining a wide and inclusive investor database.
                </li>
                <li className="mb-4">
                  <strong>Explainable AI:</strong> Our matching tool provides clear insights into how connections are made, ensuring transparency for both startups and investors.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Transparent Decision-Making in Deal Flow Management</h2>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-4">
                  <strong>AI-Assisted Insights:</strong> Ampersand CRM leverages AI to help startups manage their sales pipelines and investors manage deal flow, providing real-time insights and forecasts.
                </li>
                <li className="mb-4">
                  <strong>Interpretability:</strong> Users can easily understand how AI-driven predictions are generated, fostering trust in our technology.
                </li>
                <li className="mb-4">
                  <strong>User Empowerment:</strong> Our CRM allows users to customize AI models according to their preferences, keeping them in control of their business processes.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Data Security & Privacy</h2>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-4">
                  <strong>Robust Protection:</strong> We implement end-to-end encryption and secure data storage to protect user information from unauthorized access.
                </li>
                <li className="mb-4">
                  <strong>Privacy by Design:</strong> Our AI tools comply with global standards such as GDPR, ensuring user data is handled with care and consent.
                </li>
                <li className="mb-4">
                  <strong>Confidentiality Assurance:</strong> We never share proprietary data without explicit permission and use anonymized datasets for model training.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Fairness in Growth Capital and Secondary Buyouts</h2>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-4">
                  <strong>Objective Analysis:</strong> Our AI evaluates Growth Capital and Secondary Buyout opportunities using clear, data-driven methodologies.
                </li>
                <li className="mb-4">
                  <strong>No Conflicts of Interest:</strong> Our advisory services maintain neutrality and ensure fairness in every recommendation.
                </li>
                <li className="mb-4">
                  <strong>Equal Opportunity:</strong> We use unbiased data models to ensure every startup, regardless of size or background, has equal access to capital opportunities.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Accountability & Continuous Improvement</h2>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-4">
                  <strong>Human Oversight:</strong> Our expert advisory team continuously reviews AI outputs to ensure accuracy and alignment with business goals.
                </li>
                <li className="mb-4">
                  <strong>Ongoing Audits:</strong> We regularly test and update our models to mitigate risks such as model drift or discriminatory outcomes.
                </li>
                <li className="mb-4">
                  <strong>Feedback Loops:</strong> Our AI systems learn from user interactions and feedback, driving continuous improvement and relevance.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Sustainable and Responsible Innovation</h2>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-4">
                  <strong>Green AI Practices:</strong> We aim to minimize the environmental impact of our AI operations by optimizing computing resources and adopting energy-efficient technologies.
                </li>
                <li className="mb-4">
                  <strong>Social Impact:</strong> Our solutions are designed to promote financial inclusion and support sustainable business growth.
                </li>
                <li className="mb-4">
                  <strong>Responsible Deployment:</strong> We carefully evaluate potential impacts before launching new AI features to ensure they align with our ethical standards.
                </li>
              </ul>
            </div>

            <p className="text-[#F8F8F8B2] mb-4 text-center font-medium text-lg">
              At Ampersand, Responsible AI is not just a commitment—it is a core principle driving innovation, trust, and value creation for startups and investors alike.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResponsibleAI 