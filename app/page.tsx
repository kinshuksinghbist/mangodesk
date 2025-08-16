'use client'

import { useState } from 'react'
import TranscriptUpload from '@/components/TranscriptUpload'
import CustomPrompt from '@/components/CustomPrompt'
import SummaryDisplay from '@/components/SummaryDisplay'
import EmailShare from '@/components/EmailShare'
// AI functions moved to API routes

export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [summary, setSummary] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      alert('Please upload a transcript first')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript,
          customPrompt
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate summary')
      }

      const data = await response.json()
      setSummary(data.summary)
      setIsEditing(false)
    } catch (error) {
      console.error('Error generating summary:', error)
      alert(error instanceof Error ? error.message : 'Error generating summary. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSummaryEdit = (newSummary: string) => {
    setSummary(newSummary)
  }

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Transcript Upload Section */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Upload Meeting Transcript
            </h2>
            <TranscriptUpload 
              transcript={transcript} 
              onTranscriptChange={setTranscript} 
            />
          </div>

          {/* Custom Prompt Section */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
            </h2>
            <CustomPrompt 
              prompt={customPrompt} 
              onPromptChange={setCustomPrompt} 
            />
          </div>

          {/* Generate Summary Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating || !transcript.trim()}
              className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating Summary...' : 'Generate Summary'}
            </button>
          </div>

          {/* Summary Display Section */}
          {summary && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generated Summary
              </h2>
              <SummaryDisplay
                summary={summary}
                isEditing={isEditing}
                onSummaryChange={handleSummaryEdit}
                onStartEditing={handleStartEditing}
                onSaveEdit={handleSaveEdit}
              />
            </div>
          )}

          {/* Email Share Section */}
          {summary && !isEditing && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Share Summary
              </h2>
              <EmailShare summary={summary} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
