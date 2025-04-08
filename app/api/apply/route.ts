import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Helper function to read the form data with file uploads
async function readFormData(req: Request) {
  const formData = await req.formData();
  const data: Record<string, any> = {};
  let fileBuffer = null;
  let fileName = '';
  let fileType = '';

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      const buffer = Buffer.from(await value.arrayBuffer());
      fileBuffer = buffer;
      fileName = value.name;
      fileType = value.type;
      data[key] = {
        name: value.name,
        type: value.type,
        size: value.size,
      };
    } else {
      data[key] = value;
    }
  }

  return { data, fileBuffer, fileName, fileType };
}

export async function POST(req: Request) {
  try {
    // Parse the form data including file upload
    const { data, fileBuffer, fileName, fileType } = await readFormData(req);

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

    // Create email content
    const emailSubject = `New Job Application: ${data.role || 'Position'}`;
    const emailHtml = `
      <h2>New Job Application</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.countryCode} ${data.phone}</p>
      <p><strong>Role Applied For:</strong> ${data.role}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p>CV is attached to this email.</p>
    `;

    // Configure email with attachment
    const mailOptions: any = {
      from: process.env.SMTP_FROM || 'noreply@ampvc.co',
      to: 'dev@ampvc.co',
      subject: emailSubject,
      html: emailHtml,
    };

    // Add attachment if file exists
    if (fileBuffer && fileName) {
      mailOptions.attachments = [
        {
          filename: fileName,
          content: fileBuffer,
          contentType: fileType,
        },
      ];
    }

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application', error: (error as Error).message },
      { status: 500 }
    );
  }
} 