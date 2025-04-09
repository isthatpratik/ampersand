'use client'

import React, { useState, Suspense, useRef, useEffect } from 'react'
import styles from '@/styles/contact-form.module.sass'
import buttonStyles from '@/styles/contact-form-buttons.module.sass'
import modalStyles from '@/styles/success-modal.module.sass'
import { z } from 'zod'
import { useForm, FieldError, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

interface CountryCode {
  code: string
  dial_code: string
  name: string
  flag: string
}

type FormData = {
  fullName: string
  email: string
  countryCode: string
  phone: string
  role: string
  message: string
  cv: File | null
}

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string()
    .email('Please enter a valid email'),
  countryCode: z.string(),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  role: z.string().min(1, 'Please select a role'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  cv: z.instanceof(File, { message: 'Please upload your CV' })
    .nullable()
    .refine((file) => {
      if (!file) return false;
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      return validTypes.includes(file.type);
    }, 'Please upload a PDF, DOC, or DOCX file')
})

type FormFields = keyof FormData;

const ApplyFormContent = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null)
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const roleDropdownRef = useRef<HTMLDivElement>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur'
  })

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    clearErrors,
    setError
  } = form

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false)
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
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
        
        // Set default country
        const india = codes.find((country: CountryCode) => country.code === '+91')
        if (india) {
          setSelectedCountry(india)
          setValue('countryCode', india.dial_code)
        }
      })
  }, [setValue])

  useEffect(() => {
    if (selectedCountry) {
      setValue('countryCode', selectedCountry.dial_code)
    }
  }, [selectedCountry, setValue])

  const getErrorMessage = (error: string | FieldError | undefined) => {
    if (typeof error === 'string') return error
    return error?.message || ''
  }

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setValue('role', role)
    clearErrors('role')
    setIsRoleDropdownOpen(false)
  }

  const handleInputChange = (fieldName: FormFields) => {
    clearErrors(fieldName)
  }

  const registerWithClear = (name: FormFields) => ({
    ...register(name),
    onChange: () => handleInputChange(name)
  })

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      setIsSubmitting(true);
      const data = new FormData();
      
      // Add all form fields
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('countryCode', formData.countryCode);
      data.append('phone', formData.phone);
      data.append('role', formData.role);
      data.append('message', formData.message);
      
      // Add CV file if it exists
      if (formData.cv) {
        data.append('cv', formData.cv);
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      if (result.success) {
        setShowSuccessModal(true);
        // Reset form after successful submission
        form.reset();
        setSelectedFile(null);
        setValue('cv', null);
      } else {
        throw new Error(result.error || 'Application submission failed');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(error instanceof Error ? error.message : 'Application submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      if (validTypes.includes(file.type)) {
        setSelectedFile(file)
        setValue('cv', file, { shouldValidate: true })
        clearErrors('cv')
      } else {
        setSelectedFile(null)
        setValue('cv', null)
        setError('cv', { 
          type: 'manual', 
          message: 'Please upload a PDF, DOC, or DOCX file' 
        })
      }
    } else {
      setSelectedFile(null)
      setValue('cv', null)
      setError('cv', { 
        type: 'manual', 
        message: 'Please upload your CV' 
      })
    }
  }

  const roles = [
    'Business Analyst',
    'M&A Specialist (Mergers & Acquisitions)',
    'AI/ML Engineer',
    'Full Stack Developer',
    'Creative Designer (Graphic & UI/UX',
    'AI Research Intern'
  ]

  return (
    <div className="w-full px-6 mb-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 mb-16 animate-fade-in">
          <h1 className="text-3xl lg:text-7xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_30px_rgba(255,255,255,0.4)] animate-slide-up">
            Apply Now
          </h1>
          <p className="text-[#F8F8F8B2] text-center max-w-4xl lg:text-xl text-sm text-bold animate-slide-up-delay-1">
            Get ready to launch your career
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[696px] flex flex-col gap-8 animate-fade-in-delay-2">
          <div className={`${styles.formContainer} animate-slide-up-delay-2`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className={`${styles.input} ${touchedFields.fullName && errors.fullName ? styles.error : ''}`}
                  {...registerWithClear('fullName')}
                />
                {touchedFields.fullName && errors.fullName && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.fullName)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Work Email</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  className={`${styles.input} ${touchedFields.email && errors.email ? styles.error : ''}`}
                  {...registerWithClear('email')}
                />
                {touchedFields.email && errors.email && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.email)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Contact</label>
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
                    className={`${styles.phoneInput} ${touchedFields.phone && errors.phone ? styles.error : ''}`}
                    {...registerWithClear('phone')}
                  />
                  {touchedFields.phone && errors.phone && (
                    <span className={styles.errorMessage}>
                      {getErrorMessage(errors.phone)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Role You&apos;re Applying For</label>
              <div className={styles.inputWrapper} ref={roleDropdownRef}>
                <div 
                  className={`${styles.select} ${touchedFields.role && errors.role ? styles.error : ''}`}
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                >
                  {selectedRole || 'Select a role'}
                </div>
                <input type="hidden" {...registerWithClear('role')} value={selectedRole} />
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
                {touchedFields.role && errors.role && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.role)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Ask Us</label>
              <div className={styles.inputWrapper}>
                <textarea 
                  placeholder="Enter your message or question..."
                  className={`${styles.textarea} ${touchedFields.message && errors.message ? styles.error : ''}`}
                  {...registerWithClear('message')}
                />
                {touchedFields.message && errors.message && (
                  <span className={styles.errorMessage}>
                    {getErrorMessage(errors.message)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Upload CV</label>
              <div className={`${styles.fileUpload} ${errors.cv ? styles.error : ''}`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className={styles.fileInput}
                  onChange={handleFileChange}
                />
                <div className={styles.fileUploadContent}>
                  <div className={styles.fileIcon}>
                    <Image src="/icons/upload.svg" alt="Upload" width={74} height={74} />
                  </div>
                  <div className={styles.fileText}>
                    {selectedFile ? selectedFile.name : 'Drag and drop file or Choose file'}
                    <span className={styles.fileSubtext}>PDF, DOC, DOCX up to 10MB</span>
                  </div>
                </div>
                {errors.cv && (
                  <span className={styles.errorMessage}>
                    {errors.cv.message as string}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className={`${buttonStyles.contactButton} animate-fade-in-delay-3`} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : 'Submit'}
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className={`${modalStyles.modalOverlay} animate-fade-in`}>
          <div className={`${modalStyles.modalContent} animate-scale-in`}>
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
              Your application has been submitted successfully.<br />
              We&apos;ll get back to you shortly!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const ApplyPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full py-24 px-6 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ApplyFormContent />
    </Suspense>
  )
}

export default ApplyPage 