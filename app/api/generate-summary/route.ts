import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { transcript, customPrompt } = await request.json()

    if (!transcript || !transcript.trim()) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      )
    }

    const basePrompt = `You are an AI assistant that creates concise, well-structured summaries of meeting transcripts. 
    
    Please analyze the following meeting transcript and create a comprehensive summary.`

    const customInstructions = customPrompt 
      ? `\n\nCustom Instructions: ${customPrompt}`
      : '\n\nPlease provide a general summary that includes:\n- Key discussion points\n- Decisions made\n- Action items\n- Important outcomes'

    const fullPrompt = `${basePrompt}${customInstructions}

    Meeting Transcript:
    ${transcript}

    Summary:`

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are a professional meeting summarizer. Create clear, actionable summaries that are easy to understand and follow."
        },
        {
          role: "user",
          content: fullPrompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const summary = completion.choices[0]?.message?.content || 'Failed to generate summary'
    
    return NextResponse.json({ summary })

  } catch (error) {
    console.error('Error generating summary:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary. Please check your Groq API key and try again.' },
      { status: 500 }
    )
  }
}
