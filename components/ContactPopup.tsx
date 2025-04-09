'use client'

import React, { useState, useRef, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from '@/styles/contact-form.module.sass'
import buttonStyles from '@/styles/contact-form-buttons.module.sass'
import modalStyles from '@/styles/success-modal.module.sass'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string()
      .email('Please enter a valid email')
      .refine((email) => {
        // List of blocked domains (personal and temporary email providers)
        const blockedDomains = [
          'gmail.com',
          'yahoo.com',
          'hotmail.com',
          'outlook.com',
          'aol.com',
          'icloud.com',
          'proton.me',
          'protonmail.com',
          'temp-mail.org',
          'tempmail.com',
          'mailinator.com',
          'guerrillamail.com',
          'yopmail.com',
          '10minutemail.com',
          'disposablemail.com',
          'throwawaymail.com',
          'mail.com',
          'zoho.com',
          'live.com',
          'msn.com'
        ]
        
        const domain = email.split('@')[1]?.toLowerCase()
        return !blockedDomains.includes(domain)
      }, 'Please use your company email address'),
  countryCode: z.string(),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  referralSource: z.string().min(1, 'Please select how you heard about us'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type FormData = z.infer<typeof formSchema>
type FormFields = keyof FormData

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
  service: string
}

interface CountryCode {
  code: string
  dial_code: string
  name: string
  flag: string
}

const ContactPopup = ({ isOpen, onClose, service }: ContactPopupProps) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [isReferralDropdownOpen, setIsReferralDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null)
  const [selectedReferral, setSelectedReferral] = useState('')
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const popupRef = useRef<HTMLDivElement>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const referralDropdownRef = useRef<HTMLDivElement>(null)

  const referralSources = [
    'Google',
    'LinkedIn',
    'Medium',
    'Referral',
    'Other'
  ]

  const {
    register,
    handleSubmit,
    formState: { errors},
    setValue,
    reset,
    clearErrors
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: '+91',
      phone: '',
      referralSource: '',
      message: ''
    }
  })

  useEffect(() => {
    if (selectedCountry) {
      setValue('countryCode', selectedCountry.dial_code)
    }
  }, [selectedCountry, setValue])

  useEffect(() => {
    if (selectedReferral) setValue('referralSource', selectedReferral)
  }, [selectedReferral, setValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
      if (referralDropdownRef.current && !referralDropdownRef.current.contains(event.target as Node)) {
        setIsReferralDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    // Fetch country codes
    fetch('https://restcountries.com/v3.1/all?fields=name,idd,flag')
      .then(res => res.json())
      .then(data => {
        const codes = data
          .filter((country: { idd: { root: string; suffixes: string[] } }) => country.idd.root && country.idd.suffixes?.[0])
          .map((country: { idd: { root: string; suffixes: string[] }; name: { common: string }; flag: string }) => ({
            code: country.idd.root + country.idd.suffixes[0],
            name: country.name.common,
            dial_code: country.idd.root + country.idd.suffixes[0],
            flag: country.flag
          }))
          .sort((a: CountryCode, b: CountryCode) => a.name.localeCompare(b.name))
        setCountryCodes(codes)
        
        // Set default country
        const india = codes.find((country: CountryCode) => country.code === '+91')
        if (india) {
          setSelectedCountry(india)
          setValue('countryCode', india.dial_code)
        }
      })
  }, [setValue])

  // Reset success modal when popup is opened/closed
  useEffect(() => {
    if (!isOpen) {
      setShowSuccessModal(false)
    }
  }, [isOpen])

  // Modified close handler to reset success modal
  const handleClose = () => {
    setShowSuccessModal(false)
    onClose()
  }

  const getErrorMessage = (error: string | { message?: string } | undefined) => {
    if (typeof error === 'string') return error
    return error?.message || ''
  }

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
  }

  const handleReferralSelect = (source: string) => {
    setSelectedReferral(source)
    setIsReferralDropdownOpen(false)
    clearErrors('referralSource')
  }

  const handleInputChange = (fieldName: FormFields) => {
    clearErrors(fieldName)
  }

  const registerWithClear = (name: FormFields) => ({
    ...register(name),
    onChange: () => handleInputChange(name)
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      const formData = {
        ...data,
        service
      }

      const response = await fetch('/api/popup-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowSuccessModal(true)
        reset()
        setSelectedCountry(null)
        setSelectedReferral('')
      } else {
        console.error('Form submission failed')
        alert('Failed to submit the form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred while submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        ref={popupRef}
        className="bg-[#1A1A1A] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative "
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={handleClose}
          className={`${modalStyles.closeButton} absolute top-6 right-6 z-10`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="p-8">
          <h2 className="text-lg mr-6 md:text-3xl font-semibold text-white mb-2 lg:max-w-2xl max-w-sm">
            Ready to take your strategy to the next level and seize limitless opportunities?
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className={styles.formGroup}>
              <label className={`${styles.label} text-[12px] sm:text-[14px]`}>Full Name</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className={`${styles.input} ${errors.fullName ? styles.error : ''}`}
                  {...registerWithClear('fullName')}
                />
                {errors.fullName && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.fullName)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} text-[12px] sm:text-[14px]`}>Work Mail</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  {...registerWithClear('email')}
                />
                {errors.email && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.email)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} text-[12px] sm:text-[14px]`}>Contact</label>
              <div className={styles.phoneGroup}>
                <div className={styles.inputWrapper} ref={countryDropdownRef}>
                  <div 
                    className={`${styles.select} ${styles.countryCode}`}
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  >
                    {selectedCountry?.dial_code || '+91'}
                  </div>
                  <input type="hidden" {...registerWithClear('countryCode')} value={selectedCountry?.dial_code || '+91'} />
                  {isCountryDropdownOpen && (
                    <div className={styles.countryCodeDropdown}>
                      <div className={styles.countryCodeDropdownContent}>
                        {countryCodes.map((country) => (
                          <div
                            key={`${country.code}-${country.name}`}
                            className={styles.countryCodeOption}
                            onClick={() => handleCountrySelect(country)}
                          >
                            {country.flag} {country.code}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <input 
                    type="tel" 
                    placeholder="1234567890"
                    className={`${styles.phoneInput} ${errors.phone ? styles.error : ''}`}
                    {...registerWithClear('phone')}
                  />
                  {errors.phone && (
                    <span className={styles.errorMessage}>
                      {getErrorMessage(errors.phone)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} text-[12px] sm:text-[14px]`}>How did you hear about us?</label>
              <div className={styles.inputWrapper} ref={referralDropdownRef}>
                <div 
                  className={`${styles.select} ${errors.referralSource ? styles.error : ''}`}
                  onClick={() => setIsReferralDropdownOpen(!isReferralDropdownOpen)}
                >
                  {selectedReferral || 'Select'}
                </div>
                <input type="hidden" {...registerWithClear('referralSource')} value={selectedReferral} />
                {isReferralDropdownOpen && (
                  <div className={styles.countryCodeDropdown}>
                    <div className={styles.countryCodeDropdownContent}>
                      {referralSources.map((source) => (
                        <div
                          key={source}
                          className={styles.countryCodeOption}
                          onClick={() => handleReferralSelect(source)}
                        >
                          {source}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.referralSource && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.referralSource)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} text-[12px] sm:text-[14px]`}>Ask Us</label>
              <div className={styles.inputWrapper}>
                <textarea 
                  placeholder="Enter your message or question..."
                  className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                  {...registerWithClear('message')}
                />
                {errors.message && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.message)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                type="submit" 
                className={buttonStyles.contactButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit <ArrowRight className="ml-2" size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            className={modalStyles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={modalStyles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                className={modalStyles.closeButton}
                onClick={() => {
                  setShowSuccessModal(false)
                  handleClose()
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className={modalStyles.title}>Thank You!</h2>
              <p className={modalStyles.message}>
                Your form has been submitted successfully.<br />
                We&apos;ll get back to you shortly!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactPopup 