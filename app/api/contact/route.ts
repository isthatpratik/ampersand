import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const formData = await req.json();
    
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Prepare data based on which form was submitted (multi-step or apply form)
    let emailSubject = '';
    let emailHtml = '';

    if (formData.step1) {
      // Multi-step contact form
      emailSubject = 'New Contact Form Submission';
      emailHtml = `
        <h2>New Contact Form Submission</h2>
        <h3>Personal Details:</h3>
        <p><strong>Name:</strong> ${formData.step1.fullName}</p>
        <p><strong>Email:</strong> ${formData.step1.email}</p>
        <p><strong>Phone:</strong> ${formData.step1.countryCode} ${formData.step1.phone}</p>
        
        <h3>Company Details:</h3>
        <p><strong>Company Name:</strong> ${formData.step2.companyName}</p>
        <p><strong>Industry:</strong> ${formData.step2.industry}</p>
        <p><strong>Role:</strong> ${formData.step2.role}</p>
        
        <h3>Service Information:</h3>
        <p><strong>Service Interested In:</strong> ${formData.step3.services}</p>
        <p><strong>Referral Source:</strong> ${formData.step3.referralSource}</p>
        <p><strong>Message:</strong> ${formData.step3.message}</p>
      `;
    } else {
      // Apply form
      emailSubject = 'New Job Application Submission';
      emailHtml = `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.countryCode} ${formData.phone}</p>
        <p><strong>Role Applied For:</strong> ${formData.role}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        <p>CV is attached to this email.</p>
      `;

      // Note: For file attachments, you would need to handle them separately
      // This would typically involve using multer or similar middleware in a traditional API route
      // In App Router, you'd need to handle file uploads differently
    }

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@ampvc.co',
      to: 'dev@ampvc.co',
      subject: emailSubject,
      html: emailHtml,
      // For file attachments, you would add them here
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email', error: (error as Error).message },
      { status: 500 }
    );
  }
} 