import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { recipients, subject, message, summary } = await request.json()

    // Validate input
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { message: 'Recipients are required' },
        { status: 400 }
      )
    }

    if (!subject || !summary) {
      return NextResponse.json(
        { message: 'Subject and summary are required' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const emailContent = `
${message}

---

MEETING SUMMARY:
${summary}

---

Sent via MangoDesk Meeting Summarizer
    `.trim()

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipients.join(', '),
      subject: subject,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p style="color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937;">Meeting Summary</h3>
            <div style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${summary}</div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            Sent via MangoDesk Meeting Summarizer
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      message: 'Email sent successfully',
      messageId: info.messageId,
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    )
  }
}
