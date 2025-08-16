import { FileText, Users, Share2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MangoDesk</h1>
              <p className="text-gray-600">AI Meeting Notes Summarizer</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <FileText className="h-5 w-5" />
              <span>Summarize</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span>Collaborate</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
