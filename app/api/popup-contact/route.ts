import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const data = await req.json();
    
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Prepare email content
    const emailSubject = `New Service Inquiry: ${data.service}`;
    const emailHtml = `
      <h2>New Service Inquiry</h2>
      <p><strong>Service Interested In:</strong> ${data.service}</p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.countryCode} ${data.phone}</p>
      <p><strong>Referral Source:</strong> ${data.referralSource}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `;

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'dev@ampvc.co',
      to: 'at@ampvc.co',
      subject: emailSubject,
      html: emailHtml,
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