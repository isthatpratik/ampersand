'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '@/styles/contact-form.module.sass'
import buttonStyles from '@/styles/contact-form-buttons.module.sass'
import modalStyles from '@/styles/success-modal.module.sass'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  role: z.string(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  cv: z.any().refine((file) => file?.length > 0, 'Please upload your CV')
})

type FormData = z.infer<typeof formSchema>

const ApplyFormContent = () => {
  const searchParams = useSearchParams()
  const role = searchParams.get('role')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (role) {
      setValue('role', role)
    }
  }, [role, setValue])

  const onSubmit = async (data: FormData) => {
    console.log(data)
    setShowSuccessModal(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setValue('cv', e.target.files)
    }
  }

  return (
    <div className="min-h-screen w-full py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 mb-16">
          <h1 className="text-5xl font-semibold text-white text-center mb-4 drop-shadow-[0_4px_60px_rgba(255,255,255,0.4)]">
            Apply Now
          </h1>
          <p className="text-[#9B9B9B] text-center max-w-4xl">
            Get ready to launch your career
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[696px] flex flex-col gap-8">
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className={`${styles.input} ${errors.fullName ? styles.error : ''}`}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <span className={styles.errorMessage}>
                    {errors.fullName.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>E-Mail</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  placeholder="you@email.com"
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  {...register('email')}
                />
                {errors.email && (
                  <span className={styles.errorMessage}>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Contact</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="tel" 
                  placeholder="1234567890"
                  className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                  {...register('phone')}
                />
                {errors.phone && (
                  <span className={styles.errorMessage}>
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Role You&apos;re Applying For</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  className={styles.input}
                  value={role?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  readOnly
                />
                <input type="hidden" {...register('role')} value={role || ''} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Ask Us</label>
              <div className={styles.inputWrapper}>
                <textarea 
                  placeholder="Enter your message or question..."
                  className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                  {...register('message')}
                />
                {errors.message && (
                  <span className={styles.errorMessage}>
                    {errors.message.message}
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
                  {...register('cv', {
                    onChange: handleFileChange
                  })}
                />
                <div className={styles.fileUploadContent}>
                  <div className={styles.fileIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16L12 8M12 8L9 11M12 8L15 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.fileText}>
                    {selectedFile ? selectedFile.name : 'Drag and drop file or Choose file'}
                    <span className={styles.fileSubtext}>JPEG, PNG, PDF, and up to 10MB</span>
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

          <button type="submit" className={buttonStyles.contactButton}>
            Submit
          </button>
        </form>
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