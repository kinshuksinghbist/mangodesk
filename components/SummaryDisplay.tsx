import { useState } from 'react'
import { Edit3, Save, X, Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface SummaryDisplayProps {
  summary: string
  isEditing: boolean
  onSummaryChange: (summary: string) => void
  onStartEditing: () => void
  onSaveEdit: () => void
}

export default function SummaryDisplay({
  summary,
  isEditing,
  onSummaryChange,
  onStartEditing,
  onSaveEdit
}: SummaryDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      toast.success('Summary copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy summary')
    }
  }

  const handleSave = () => {
    if (summary.trim()) {
      onSaveEdit()
      toast.success('Summary saved!')
    } else {
      toast.error('Summary cannot be empty')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Meeting Summary</h3>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="text-sm">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
              <button
                onClick={onStartEditing}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span className="text-sm">Edit</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span className="text-sm">Save</span>
              </button>
              <button
                onClick={onSaveEdit}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="text-sm">Cancel</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
        {isEditing ? (
          <textarea
            value={summary}
            onChange={(e) => onSummaryChange(e.target.value)}
            className="w-full h-full min-h-[200px] bg-transparent border-none outline-none resize-none text-gray-700 font-medium"
            placeholder="Edit your summary here..."
          />
        ) : (
          <div className="prose prose-sm max-w-none">
            <div 
              className="text-gray-700 font-medium leading-relaxed"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {summary}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Character count: {summary.length}</span>
          <span>Words: {summary.split(/\s+/).filter(word => word.length > 0).length}</span>
        </div>
      )}

      {isEditing && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ✏️ <strong>Editing mode:</strong> Make your changes and click Save when done, or Cancel to discard changes.
          </p>
        </div>
      )}
    </div>
  )
}
