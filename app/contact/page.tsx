'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/contact-form.module.sass'
import buttonStyles from '@/styles/contact-form-buttons.module.sass'
import { z } from 'zod'
import { useForm, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import modalStyles from '@/styles/success-modal.module.sass'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Form validation schema
const formSchema = z.object({
  step1: z.object({
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

type FormFields = 
  | 'step1.fullName'
  | 'step1.email'
  | 'step1.countryCode'
  | 'step1.phone'
  | 'step2.companyName'
  | 'step2.industry'
  | 'step2.role'
  | 'step3.services'
  | 'step3.referralSource'
  | 'step3.message';

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
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
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
    trigger,
    setValue,
    reset,
    clearErrors
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      step1: {
        fullName: '',
        email: '',
        countryCode: '+91',
        phone: ''
      },
      step2: {
        companyName: '',
        industry: '',
        role: ''
      },
      step3: {
        services: '',
        referralSource: '',
        message: ''
      }
    }
  })

  // Watch for country code changes
  useEffect(() => {
    if (selectedCountry) {
      setValue('step1.countryCode', selectedCountry.dial_code)
    }
  }, [selectedCountry, setValue])

  // Watch for dropdown changes and set form values
  useEffect(() => {
    if (selectedIndustry) setValue('step2.industry', selectedIndustry)
    if (selectedRole) setValue('step2.role', selectedRole)
    if (selectedService) setValue('step3.services', selectedService)
    if (selectedReferral) setValue('step3.referralSource', selectedReferral)
  }, [selectedIndustry, selectedRole, selectedService, selectedReferral, setValue])

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

  const onSubmit = async (data: FormData) => {
    const isValid = await trigger([
      'step3.services' as keyof FormData,
      'step3.referralSource' as keyof FormData,
      'step3.message' as keyof FormData
    ])
    if (isValid) {
      console.log(data)
      setShowSuccessModal(true)
      // Reset form and state
      reset()
      setCurrentStep(1)
      setSelectedCountry(null)
      setSelectedIndustry('')
      setSelectedRole('')
      setSelectedService('')
      setSelectedReferral('')
    }
  }

  const handleNext = async () => {
    const fields = currentStep === 1 
        ? ['step1.fullName', 'step1.email', 'step1.phone', 'step1.countryCode'] 
        : currentStep === 2 
            ? ['step2.companyName', 'step2.industry', 'step2.role']
            : ['step3.services', 'step3.referralSource', 'step3.message']

    const isValid = await trigger(fields as (keyof FormData)[])
    if (isValid && currentStep < 3) {
        setCurrentStep(currentStep + 1)
        // Clear errors for the next step's fields
        if (currentStep === 1) {
          clearErrors(['step2.companyName', 'step2.industry', 'step2.role'])
        } else if (currentStep === 2) {
          clearErrors(['step3.services', 'step3.referralSource', 'step3.message'])
        }
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
    clearErrors('step2.industry')
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setIsRoleDropdownOpen(false)
    clearErrors('step2.role')
  }

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setIsServicesDropdownOpen(false)
    clearErrors('step3.services')
  }

  const handleReferralSelect = (source: string) => {
    setSelectedReferral(source)
    setIsReferralDropdownOpen(false)
    clearErrors('step3.referralSource')
  }

  const handleInputChange = (fieldPath: FormFields) => {
    clearErrors(fieldPath)
  }

  const registerWithClear = (name: FormFields) => ({
    ...register(name),
    onChange: () => handleInputChange(name)
  })

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
                  {...registerWithClear('step1.fullName')}
                />
                {errors.step1?.fullName && (
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
                  {...registerWithClear('step1.email')}
                />
                {errors.step1?.email && (
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
                  <input type="hidden" {...registerWithClear('step1.countryCode')} value={selectedCountry?.dial_code || '+91'} />
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
                    {...registerWithClear('step1.phone')}
                  />
                  {errors.step1?.phone && (
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
                  className={`${styles.input} ${touchedFields.step2?.companyName && errors.step2?.companyName ? styles.error : ''}`}
                  {...registerWithClear('step2.companyName')}
                />
                {touchedFields.step2?.companyName && errors.step2?.companyName && (
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
                  className={`${styles.select} ${touchedFields.step2?.industry && errors.step2?.industry ? styles.error : ''}`}
                  onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                >
                  {selectedIndustry || 'Select Industry Type'}
                </div>
                <input type="hidden" {...registerWithClear('step2.industry')} value={selectedIndustry} />
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
                {touchedFields.step2?.industry && errors.step2?.industry && (
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
                  className={`${styles.select} ${touchedFields.step2?.role && errors.step2?.role ? styles.error : ''}`}
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                >
                  {selectedRole || 'Select your Role'}
                </div>
                <input type="hidden" {...registerWithClear('step2.role')} value={selectedRole} />
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
                {touchedFields.step2?.role && errors.step2?.role && (
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
                <input type="hidden" {...registerWithClear('step3.services')} value={selectedService} />
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
                {errors.step3?.services && (
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
                <input type="hidden" {...registerWithClear('step3.referralSource')} value={selectedReferral} />
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
                {errors.step3?.referralSource && (
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
                  {...registerWithClear('step3.message')}
                />
                {errors.step3?.message && (
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
    <>
      <div className="lg:min-h-screen w-full lg:py-24 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className='flex flex-col items-center gap-6 lg:mb-12'>
            <h1 className="text-xl md:text-6xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]">
              Get in Touch with Our Team for Assistance and Inquiries
            </h1>
            <p className="text-[#9B9B9B] text-xs md:text-xl text-center max-w-4xl mb-16">
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
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={buttonStyles.contactButton}
                >
                  <ArrowLeft className="mr-2" size={24} />
                  Back
                </button>
              )}
              <button
                type="submit"
                onClick={currentStep === 3 ? undefined : handleNext}
                className={buttonStyles.contactButton}
              >
                {currentStep === 3 ? 'Submit' : 'Next'}
                {currentStep !== 3 && (
                  <ArrowRight className="ml-2" size={24} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modalContent}>
            <button 
              className={modalStyles.closeButton}
              onClick={() => setShowSuccessModal(false)}
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
          </div>
        </div>
      )}
    </>
  )
}

export default Contact