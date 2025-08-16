import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    groqApiKey: process.env.GROQ_API_KEY ? '✅ Set' : '❌ Not set',
    groqApiKeyLength: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0,
    groqApiKeyPrefix: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0, 4) : 'N/A',
    smtpHost: process.env.SMTP_HOST || '❌ Not set',
    smtpUser: process.env.SMTP_USER || '❌ Not set',
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}
