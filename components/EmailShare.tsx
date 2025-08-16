import { useState } from 'react'
import { Mail, Send, UserPlus, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface EmailShareProps {
  summary: string
}

export default function EmailShare({ summary }: EmailShareProps) {
  const [recipients, setRecipients] = useState<string[]>([''])
  const [subject, setSubject] = useState('Meeting Summary')
  const [message, setMessage] = useState('Please find the meeting summary attached below.')
  const [isSending, setIsSending] = useState(false)

  const addRecipient = () => {
    setRecipients([...recipients, ''])
  }

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      const newRecipients = recipients.filter((_, i) => i !== index)
      setRecipients(newRecipients)
    }
  }

  const updateRecipient = (index: number, value: string) => {
    const newRecipients = [...recipients]
    newRecipients[index] = value
    setRecipients(newRecipients)
  }

  const validateEmails = (emails: string[]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emails.every(email => email.trim() === '' || emailRegex.test(email.trim()))
  }

  const handleSend = async () => {
    const validRecipients = recipients.filter(email => email.trim() !== '')
    
    if (validRecipients.length === 0) {
      toast.error('Please add at least one recipient')
      return
    }

    if (!validateEmails(validRecipients)) {
      toast.error('Please enter valid email addresses')
      return
    }

    if (!subject.trim()) {
      toast.error('Please enter a subject')
      return
    }

    setIsSending(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: validRecipients,
          subject,
          message,
          summary
        }),
      })

      if (response.ok) {
        toast.success('Summary sent successfully!')
        // Reset form
        setRecipients([''])
        setSubject('Meeting Summary')
        setMessage('Please find the meeting summary attached below.')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Failed to send email. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-gray-700">
        <Mail className="h-5 w-5" />
        <span className="font-medium">Share via Email</span>
      </div>

      {/* Recipients */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Recipients
        </label>
        {recipients.map((email, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => updateRecipient(index, e.target.value)}
              placeholder="recipient@example.com"
              className="input-field flex-1"
            />
            {recipients.length > 1 && (
              <button
                onClick={() => removeRecipient(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addRecipient}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Another Recipient</span>
        </button>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          id="email-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input-field"
          placeholder="Meeting Summary"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="email-message" className="block text-sm font-medium text-gray-700">
          Message (Optional)
        </label>
        <textarea
          id="email-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-field min-h-[100px] resize-none"
          placeholder="Add a personal message..."
          rows={4}
        />
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          disabled={isSending}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
          <span>{isSending ? 'Sending...' : 'Send Summary'}</span>
        </button>
      </div>

      {/* Info */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📧 <strong>Note:</strong> The summary will be included in the email body. 
          Make sure to configure your email settings in the environment variables.
        </p>
      </div>
    </div>
  )
}
