'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/contact-form.module.sass'
import buttonStyles from '@/styles/hero-button.module.sass'
import { z } from 'zod'
import { useForm, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Form validation schema
const formSchema = z.object({
  step1: z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    countryCode: z.string(),
    phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number')
  }),
  step2: z.object({
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    industry: z.string().min(1, 'Please select an industry'),
    role: z.string().min(1, 'Please select your role')
  }),
  step3: z.object({
    services: z.string().min(1, 'Please select a service'),
    referralSource: z.string().min(1, 'Please select how you heard about us'),
    message: z.string().min(10, 'Message must be at least 10 characters')
  })
})

type FormData = z.infer<typeof formSchema>

interface CountryCode {
  code: string
  dial_code: string
  name: string
  flag: string
}

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([])
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const steps = ['Personal Details', 'Company Details', 'Service']

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur'
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
      })
  }, [])

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const handleNext = async () => {
    const fields = currentStep === 1 
        ? ['step1.fullName', 'step1.email', 'step1.phone'] 
        : currentStep === 2 
            ? ['step2.companyName', 'step2.industry', 'step2.role']
            : ['step3.services', 'step3.referralSource', 'step3.message']

    const isValid = await trigger(fields as (keyof FormData)[])
    if (isValid && currentStep < 3) {
        setCurrentStep(currentStep + 1)
        reset() // Reset form data when moving to next step
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1)
        reset() // Reset form data when moving back
    }
  }

  const getErrorMessage = (error: string | FieldError | undefined) => {
    if (typeof error === 'string') return error
    return error?.message || ''
  }

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
  }

  const renderForm = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className={`${styles.input} ${errors.step1?.fullName ? styles.error : ''}`}
                  {...register('step1.fullName')}
                />
                {errors.step1?.fullName && touchedFields.step1?.fullName && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step1.fullName)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Work Mail</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  className={`${styles.input} ${errors.step1?.email ? styles.error : ''}`}
                  {...register('step1.email')}
                />
                {errors.step1?.email && touchedFields.step1?.email && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step1.email)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Contact</label>
              <div className={styles.phoneGroup}>
                <div className={styles.inputWrapper} ref={dropdownRef}>
                  <div 
                    className={`${styles.select} ${styles.countryCode}`}
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  >
                    {selectedCountry?.dial_code || '+91'}
                  </div>
                  {isCountryDropdownOpen && (
                    <div className={styles.countryCodeDropdown}>
                      <div className={styles.countryCodeDropdownContent}>
                        {countryCodes.map((country) => (
                          <div
                            key={country.code}
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
                    className={`${styles.phoneInput} ${errors.step1?.phone ? styles.error : ''}`}
                    {...register('step1.phone')}
                  />
                  {errors.step1?.phone && touchedFields.step1?.phone && (
                    <span className={styles.errorMessage}>
                      {getErrorMessage(errors.step1.phone)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company Name</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  placeholder="Company Name"
                  className={`${styles.input} ${errors.step2?.companyName ? styles.error : ''}`}
                  {...register('step2.companyName')}
                />
                {errors.step2?.companyName && touchedFields.step2?.companyName && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step2.companyName)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Industry</label>
              <div className={styles.inputWrapper}>
                <select 
                  className={`${styles.select} ${errors.step2?.industry ? styles.error : ''}`}
                  {...register('step2.industry')}
                >
                  <option value="">Select Industry Type</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                </select>
                {errors.step2?.industry && touchedFields.step2?.industry && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step2.industry)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <div className={styles.inputWrapper}>
                <select 
                  className={`${styles.select} ${errors.step2?.role ? styles.error : ''}`}
                  {...register('step2.role')}
                >
                  <option value="">Select your Role</option>
                  <option value="ceo">CEO</option>
                  <option value="cto">CTO</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                </select>
                {errors.step2?.role && touchedFields.step2?.role && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step2.role)}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label className={styles.label}>What Services are you interested in?</label>
              <div className={styles.inputWrapper}>
                <select 
                  className={`${styles.select} ${errors.step3?.services ? styles.error : ''}`}
                  {...register('step3.services')}
                >
                  <option value="">Select Services</option>
                  <option value="consulting">Consulting</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                </select>
                {errors.step3?.services && touchedFields.step3?.services && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step3.services)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>How did you hear about us?</label>
              <div className={styles.inputWrapper}>
                <select 
                  className={`${styles.select} ${errors.step3?.referralSource ? styles.error : ''}`}
                  {...register('step3.referralSource')}
                >
                  <option value="">Select</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral</option>
                </select>
                {errors.step3?.referralSource && touchedFields.step3?.referralSource && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step3.referralSource)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Ask Us</label>
              <div className={styles.inputWrapper}>
                <textarea 
                  placeholder="Enter your message or question..."
                  className={`${styles.textarea} ${errors.step3?.message ? styles.error : ''}`}
                  {...register('step3.message')}
                />
                {errors.step3?.message && touchedFields.step3?.message && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step3.message)}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen w-full py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-xl lg:text-6xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]">
          Get in Touch with Our Team for Assistance and Inquiries
        </h1>
        <p className="text-[#9B9B9B] text-xs lg:text-xl text-center max-w-4xl mb-16">
          Have questions or need support? Our team is here to help with any inquiries, feedback, or assistance you may need. Reach out to us, and we&apos;ll get back to you as soon as possible.
        </p>

        <div className={styles.stepperContainer}>
          <div 
            className={`${styles.stepConnector} ${styles.first} ${
              currentStep === 1 ? styles.active : styles.inactive
            }`} 
          />
          <div 
            className={`${styles.stepConnector} ${styles.second} ${
              currentStep === 2 ? styles.active : styles.inactive
            }`} 
          />
          {steps.map((step, index) => (
            <div key={index} className={styles.stepItem}>
              <div className={styles.stepOuter}>
                <div className={styles.stepInner}>
                  <div className={`${styles.stepDot} ${currentStep > index + 1 ? styles.completed : currentStep === index + 1 ? styles.active : ''}`} />
                </div>
              </div>
              <span className={`${styles.stepLabel} ${currentStep === index + 1 ? styles.active : ''}`}>{step}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-8">
          {renderForm()}
          
          <div className="flex gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className={buttonStyles.heroButton}
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={currentStep === 3 ? handleSubmit(onSubmit) : handleNext}
              className={buttonStyles.heroButton}
            >
              {currentStep === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact