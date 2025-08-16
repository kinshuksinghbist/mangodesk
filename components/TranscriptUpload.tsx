import { useState, useRef } from 'react'
import { Upload, FileText, X } from 'lucide-react'

interface TranscriptUploadProps {
  transcript: string
  onTranscriptChange: (transcript: string) => void
}

export default function TranscriptUpload({ transcript, onTranscriptChange }: TranscriptUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        onTranscriptChange(text)
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a text file (.txt)')
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const clearTranscript = () => {
    onTranscriptChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {!transcript ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 mb-2">
            Drag and drop your meeting transcript here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse files
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Transcript loaded</span>
            </div>
            <button
              onClick={clearTranscript}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <textarea
              value={transcript}
              onChange={(e) => onTranscriptChange(e.target.value)}
              placeholder="Paste or edit your meeting transcript here..."
              className="w-full h-full min-h-[200px] bg-transparent border-none outline-none resize-none text-gray-700"
            />
          </div>
          
          <div className="text-sm text-gray-500">
            Character count: {transcript.length}
          </div>
        </div>
      )}
    </div>
  )
}
