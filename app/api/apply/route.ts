import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const countryCode = formData.get('countryCode');
    const phone = formData.get('phone');
    const role = formData.get('role');
    const message = formData.get('message');
    const cv = formData.get('cv');

    // Validate required fields
    if (!fullName || !email || !phone || !role || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let attachment = null;
    if (cv instanceof File) {
      try {
        // Validate file type
        const validTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (!validTypes.includes(cv.type)) {
          return NextResponse.json(
            { success: false, error: 'Invalid file type. Please upload a PDF, DOC, or DOCX file' },
            { status: 400 }
          );
        }

        // Convert file to buffer for email attachment
        const arrayBuffer = await cv.arrayBuffer();
        attachment = {
          filename: cv.name,
          content: Buffer.from(arrayBuffer)
        };
      } catch (error) {
        console.error('Error processing CV file:', error);
        return NextResponse.json(
          { success: false, error: 'Error processing CV file' },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dev@ampvc.co',
      subject: `New Job Application for ${role}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>Role Applied For:</strong> ${role}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>CV is attached to this email.</p>
      `,
      attachments: attachment ? [attachment] : []
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: emailError instanceof Error ? emailError.message : 'Unknown email error'
        }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process application',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 