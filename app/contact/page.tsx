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
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false)
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isReferralDropdownOpen, setIsReferralDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedReferral, setSelectedReferral] = useState('')
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const industryDropdownRef = useRef<HTMLDivElement>(null)
  const roleDropdownRef = useRef<HTMLDivElement>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const referralDropdownRef = useRef<HTMLDivElement>(null)

  const steps = ['Personal Details', 'Company Details', 'Service']

  const industries = [
    'Saas',
    'Fintech',
    'Healtech',
    'Edtech',
    'E-commerce',
    'Artificial Intelligence',
    'Consulting',
    'Others'
  ]

  const roles = [
    'CEO',
    'Founder',
    'Co-Founder',
    'CMO (Chief Marketing Officer)',
    'CFO (Chief Financial Officer)',
    'CTO (Chief Technology Officer)',
    'COO (Chief Operating Officer)',
    'Startup Advisor',
    'Venture Capitalist',
    'Private Equity Investor',
    'Institutional Investor',
    'LP (Limited Partner)',
    'Investment Analyst',
    'Family Office Representative',
    'Others'
  ]

  const services = [
    'Exit Strategy',
    'Board Representation',
    'Secondary Buyout'
  ]

  const referralSources = [
    'Google',
    'LinkedIn',
    'Medium',
    'Other'
  ]

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur'
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
      if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target as Node)) {
        setIsIndustryDropdownOpen(false)
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false)
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false)
      }
      if (referralDropdownRef.current && !referralDropdownRef.current.contains(event.target as Node)) {
        setIsReferralDropdownOpen(false)
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
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1)
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

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry)
    setIsIndustryDropdownOpen(false)
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setIsRoleDropdownOpen(false)
  }

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setIsServicesDropdownOpen(false)
  }

  const handleReferralSelect = (source: string) => {
    setSelectedReferral(source)
    setIsReferralDropdownOpen(false)
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
              <div className={styles.inputWrapper} ref={industryDropdownRef}>
                <div 
                  className={`${styles.select} ${errors.step2?.industry ? styles.error : ''}`}
                  onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                >
                  {selectedIndustry || 'Select Industry Type'}
                </div>
                <input type="hidden" {...register('step2.industry')} value={selectedIndustry} />
                {isIndustryDropdownOpen && (
                  <div className={styles.countryCodeDropdown}>
                    <div className={styles.countryCodeDropdownContent}>
                      {industries.map((industry) => (
                        <div
                          key={industry}
                          className={styles.countryCodeOption}
                          onClick={() => handleIndustrySelect(industry)}
                        >
                          {industry}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.step2?.industry && touchedFields.step2?.industry && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step2.industry)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <div className={styles.inputWrapper} ref={roleDropdownRef}>
                <div 
                  className={`${styles.select} ${errors.step2?.role ? styles.error : ''}`}
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                >
                  {selectedRole || 'Select your Role'}
                </div>
                <input type="hidden" {...register('step2.role')} value={selectedRole} />
                {isRoleDropdownOpen && (
                  <div className={styles.countryCodeDropdown}>
                    <div className={styles.countryCodeDropdownContent}>
                      {roles.map((role) => (
                        <div
                          key={role}
                          className={styles.countryCodeOption}
                          onClick={() => handleRoleSelect(role)}
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              <div className={styles.inputWrapper} ref={servicesDropdownRef}>
                <div 
                  className={`${styles.select} ${errors.step3?.services ? styles.error : ''}`}
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                >
                  {selectedService || 'Select Services'}
                </div>
                <input type="hidden" {...register('step3.services')} value={selectedService} />
                {isServicesDropdownOpen && (
                  <div className={styles.countryCodeDropdown}>
                    <div className={styles.countryCodeDropdownContent}>
                      {services.map((service) => (
                        <div
                          key={service}
                          className={styles.countryCodeOption}
                          onClick={() => handleServiceSelect(service)}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.step3?.services && touchedFields.step3?.services && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.step3.services)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>How did you hear about us?</label>
              <div className={styles.inputWrapper} ref={referralDropdownRef}>
                <div 
                  className={`${styles.select} ${errors.step3?.referralSource ? styles.error : ''}`}
                  onClick={() => setIsReferralDropdownOpen(!isReferralDropdownOpen)}
                >
                  {selectedReferral || 'Select'}
                </div>
                <input type="hidden" {...register('step3.referralSource')} value={selectedReferral} />
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
    <div className="min-h-screen w-full lg:py-24 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className='flex flex-col items-center gap-6 mb-12'>
          <h1 className="text-xl lg:text-6xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]">
            Get in Touch with Our Team for Assistance and Inquiries
          </h1>
          <p className="text-[#9B9B9B] text-xs lg:text-xl text-center max-w-4xl mb-16">
            Have questions or need support? Our team is here to help with any inquiries, feedback, or assistance you may need. Reach out to us, and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

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