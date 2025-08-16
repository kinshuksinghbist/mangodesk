import { useState } from 'react'
import { Lightbulb, Sparkles } from 'lucide-react'

interface CustomPromptProps {
  prompt: string
  onPromptChange: (prompt: string) => void
}

const presetPrompts = [
  {
    title: 'Executive Summary',
    description: 'Summarize in bullet points for executives',
    prompt: 'Please provide a concise executive summary with key points in bullet format, highlighting main decisions and outcomes.'
  },
  {
    title: 'Action Items',
    description: 'Highlight only action items and next steps',
    prompt: 'Extract and list all action items, assignments, and next steps with clear ownership and deadlines.'
  },
  {
    title: 'Technical Details',
    description: 'Focus on technical specifications and requirements',
    prompt: 'Summarize technical discussions, requirements, specifications, and implementation details discussed in the meeting.'
  },
  {
    title: 'Stakeholder Update',
    description: 'Create a stakeholder-friendly summary',
    prompt: 'Provide a high-level summary suitable for stakeholders, focusing on business impact and strategic decisions.'
  }
]

export default function CustomPrompt({ prompt, onPromptChange }: CustomPromptProps) {
  const [showPresets, setShowPresets] = useState(false)

  const handlePresetSelect = (presetPrompt: string) => {
    onPromptChange(presetPrompt)
    setShowPresets(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Custom Instructions</span>
        </div>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {showPresets ? 'Hide' : 'Show'} Preset Prompts
        </button>
      </div>

      {showPresets && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
          {presetPrompts.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetSelect(preset.prompt)}
              className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">{preset.title}</div>
              <div className="text-sm text-gray-600">{preset.description}</div>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-700">
          Describe how you want the AI to summarize your meeting
        </label>
        <textarea
          id="custom-prompt"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="e.g., 'Summarize in bullet points for executives' or 'Highlight only action items and next steps'"
          className="input-field min-h-[100px] resize-none"
          rows={4}
        />
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Sparkles className="h-4 w-4" />
          <span>
            {prompt.length > 0 
              ? `${prompt.length} characters` 
              : 'Leave empty for a general summary'
            }
          </span>
        </div>
      </div>

      {!prompt && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Custom instructions help the AI generate more relevant summaries. 
            Try specifying the format, audience, or focus areas you need.
          </p>
        </div>
      )}
    </div>
  )
}
