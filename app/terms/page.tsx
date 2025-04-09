'use client'

import React from 'react'
import { motion } from 'framer-motion'

const TermsOfUse = () => {
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
            Terms of Use
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
            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                By accessing or using this website, you agree to be bound by these Terms of Use and our Privacy Policy. 
                If you do not agree, please do not use this website.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">2. About Ampersand</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                Ampersand provides strategic legal operations consulting and solutions for investors and founders. 
                The content provided on this website is for informational purposes only and does not constitute legal, 
                financial, or professional advice.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">3. Use of Website</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                You agree to use this website only for lawful purposes and in a manner that does not infringe 
                the rights of, or restrict the use and enjoyment of this site by any third party.
              </p>
              <p className="text-[#F8F8F8B2] mb-2">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 text-[#F8F8F8B2]">
                <li className="mb-2">Attempt to gain unauthorized access to the site, its servers, or any connected database.</li>
                <li className="mb-2">Copy, duplicate, or reproduce any content from the website without prior written permission.</li>
                <li className="mb-2">Use the website for any commercial or competitive purpose without our consent.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                All content, trademarks, logos, and other intellectual property displayed on the website are the 
                property of Ampersand or its licensors. You may not use, reproduce, or distribute any such 
                materials without written permission.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">5. Disclaimer</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                The website and its content are provided &ldquo;as is&rdquo; and without warranties of any kind, either express or implied. 
                We do not guarantee the accuracy, reliability, or completeness of any information on the website.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                To the fullest extent permitted by law, Ampersand shall not be liable for any direct, indirect, 
                incidental, or consequential damages arising from the use of or inability to use the website.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">7. Links to Other Websites</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                This website may contain links to third-party websites. We do not endorse or assume responsibility 
                for the content or privacy practices of any linked site.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">8. Changes to These Terms</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                We may update these Terms of Use at any time without prior notice. Continued use of the website 
                constitutes acceptance of the updated terms.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">9. Governing Law</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                These Terms of Use shall be governed by and construed in accordance with the laws of India, 
                without regard to conflict of law principles.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
              <p className="text-[#F8F8F8B2] mb-4">
                If you have any questions about these Terms of Use, please contact us at:
                <br />
                📧 info@ampvc.co
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfUse 