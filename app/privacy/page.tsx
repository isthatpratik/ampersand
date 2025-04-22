'use client'

import React from 'react'
import { motion } from 'framer-motion'

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-[#9B9B9B] text-center text-sm lg:text-xl max-w-4xl">
            Effective Date: April, 2025
            <br />
            Website: https://ampvc.co
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
              Ampersand (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal 
              information you provide to us. This Privacy Policy outlines how we collect, use, and safeguard your 
              information when you visit our website.
            </p>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="text-[#F8F8F8B2] mb-4">We may collect the following types of information:</p>
              
              <h3 className="text-lg md:text-xl font-medium text-white mb-2">a. Personal Information</h3>
              <p className="text-[#F8F8F8B2] mb-2">You may voluntarily provide us with personal information, such as:</p>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-2">Name</li>
                <li className="mb-2">Email address</li>
                <li className="mb-2">Company/Organization</li>
                <li className="mb-2">Phone number</li>
              </ul>

              <h3 className="text-lg md:text-xl font-medium text-white mb-2">b. Non-Personal Information</h3>
              <p className="text-[#F8F8F8B2] mb-2">We may automatically collect non-identifiable information, including:</p>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-2">IP address</li>
                <li className="mb-2">Browser type</li>
                <li className="mb-2">Device type</li>
                <li className="mb-2">Pages visited</li>
                <li className="mb-2">Time spent on pages</li>
                <li className="mb-2">Referring website</li>
              </ul>

              <p className="text-[#F8F8F8B2] mb-4">
                We use cookies and similar tracking technologies to collect this data. You can manage your cookie 
                preferences via your browser settings.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-[#F8F8F8B2] mb-2">We may use your information to:</p>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-2">Respond to your inquiries or requests</li>
                <li className="mb-2">Improve our website and user experience</li>
                <li className="mb-2">Send newsletters or updates (with your consent)</li>
                <li className="mb-2">Analyze website performance and usage trends</li>
                <li className="mb-2">Comply with legal obligations</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">3. Sharing Your Information</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                We do <strong>not</strong> sell, rent, or trade your personal information. We may share your information 
                with third-party service providers who assist us with website functionality or analytics, under strict 
                confidentiality agreements.
              </p>
              <p className="text-[#F8F8F8B2] mb-4">
                We may also disclose your information if required by law or to protect our legal rights.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                We implement appropriate technical and organizational measures to protect your information. 
                However, no transmission over the Internet or electronic storage is 100% secure. We cannot 
                guarantee absolute security.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p className="text-[#F8F8F8B2] mb-2">Depending on your location, you may have rights to:</p>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-2">Access the personal data we hold about you</li>
                <li className="mb-2">Correct or update your information</li>
                <li className="mb-2">Request deletion of your personal data</li>
                <li className="mb-2">Withdraw consent (where applicable)</li>
              </ul>
              <p className="text-[#F8F8F8B2] mb-4">
                To exercise any of these rights, please contact us at hello@ampvc.co.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">6. Third-Party Links</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                Our website may contain links to other websites. We are not responsible for the privacy 
                practices or content of those third-party sites.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                Our website is not intended for children under the age of 13. We do not knowingly collect 
                personal data from children. If you believe we have collected data from a child, please contact us.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                We reserve the right to update this Privacy Policy at any time. Changes will be posted on 
                this page with an updated effective date. Continued use of the site after changes constitutes 
                acceptance of the updated policy.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
                <br />
                📧 hello@ampvc.co
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy 