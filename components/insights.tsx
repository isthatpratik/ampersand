"use client";

import Image from "next/image";
import styles from '@/styles/hero-button.module.sass';
import overlayStyles from '@/styles/insights-overlay.module.sass';
import { motion } from 'framer-motion';

const Insights = () => {
  return (
    <section className="py-7 lg:py-15 mx-auto flex flex-col gap-6 lg:min-h-[calc(80vh-192px)]">
      <motion.div 
        className="flex flex-col gap-6 items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.h3 
          className="text-xl lg:text-5xl font-semibold max-w-2xl mx-auto text-center bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent "
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          Insights that transform pitches into opportunities
        </motion.h3>
        <motion.p 
          className="text-xs lg:text-base text-center max-w-6xl mx-auto text-[#AFAFAF]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          Cut through the noise analyze pitch decks with precision and identify
          high-value investment opportunities with confidence.
        </motion.p>
      </motion.div>

      <motion.div 
        className="w-full max-w-6xl mx-auto lg:mt-12 mt-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="w-full bg-[#242424] rounded-[48px] overflow-hidden p-3 lg:p-6">
          <div className={`w-full rounded-[32px] overflow-hidden bg-[url("/images/insights-bg.jpg")] bg-cover bg-center ${overlayStyles.overlay}`}>
            <div className="flex flex-row gap-4 lg:gap-8 relative">
              {/* Left Section */}
              <motion.div 
                className="flex flex-col gap-4 p-6 lg:p-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div 
                  className="flex flex-col items-start gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Image
                    src="/images/spider-logo.png"
                    alt="Spider Logo"
                    width={200}
                    height={200}
                    className="w-[40px] h-[40px] lg:w-[71px] lg:h-[73px]"
                  />
                  <div className="flex flex-col">
                    <h5 className="text-lg lg:text-[32px] font-semibold text-white">
                      Spider
                    </h5>
                    <p className="text-xs lg:text-xl font-medium text-[#35EEFC]">
                      AI Pitch Deck Analyzer
                    </p>
                  </div>
                </motion.div>

                <motion.p 
                  className="text-xs lg:text-lg text-[#F8F8F8] max-w-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Spider instantly analyzes pitch decks, evaluating financials,
                  market potential, and team strength to identify high-value
                  startups. Accelerate due diligence, minimize risk, and make
                  smarter, data-driven investment decisions—faster than ever.
                </motion.p>

                <motion.button 
                  className={`${styles.heroButton} w-fit z-999`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  Coming Soon!
                </motion.button>
              </motion.div>

              {/* Right Section */}
              <motion.div 
                className="flex-1 flex items-end justify-end"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <Image
                  src="/images/insights.png"
                  alt="Insights Preview"
                  width={900}
                  height={900}
                  className="w-full h-fit object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Insights;
