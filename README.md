# MangoDesk - AI Meeting Notes Summarizer

A streamlined AI-powered web application that automatically generates structured summaries from meeting transcripts and allows easy sharing via email. Built with a clean, simplified interface for optimal user experience.

## Features

- **📝 Simple Transcript Upload**: Drag & drop or paste meeting transcripts with a clean interface
- **🤖 AI-Powered Summarization**: Uses Groq (Llama 3.1 8B) for intelligent, fast summaries
- **⚙️ Smart Preset Prompts**: Choose from optimized preset instructions or add custom ones
- **✏️ Inline Editing**: Edit summaries directly in the interface with a streamlined editor
- **📧 Email Sharing**: Send summaries to multiple recipients with a simple form
- **🎨 Clean, Modern UI**: Minimalist design built with Next.js and Tailwind CSS
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## How It Works

1. **Upload Transcript**: Drag & drop or paste your meeting transcript
2. **Choose Instructions**: Select from preset prompts or write custom instructions
3. **Generate Summary**: Click to create an AI-powered summary in seconds
4. **Edit & Review**: Make adjustments inline with the simplified editor
5. **Share**: Send the final summary to team members via email

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI**: Groq (Llama 3.1 8B) - Fast and efficient language model
- **Email**: Nodemailer for reliable email delivery
- **UI Components**: Lucide React icons for consistent iconography
- **Notifications**: React Hot Toast for user feedback

## Prerequisites

- Node.js 18+ 
- Groq API key
- SMTP email credentials (Gmail, Outlook, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kinshuksinghbist/mangodesk.git
   cd mangodesk-meeting-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your actual credentials:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key | Yes |
| `SMTP_HOST` | SMTP server hostname | Yes |
| `SMTP_PORT` | SMTP server port | Yes |
| `SMTP_USER` | Your email address | Yes |
| `SMTP_PASS` | Your email password/app password | Yes |

## Email Setup

### Gmail
1. Enable 2-Step Verification in your Google Account
2. Generate an App Password:
   - Go to Security > App passwords
   - Select "Mail" and generate a password
   - Use this password in `SMTP_PASS`

## Usage

### Basic Workflow
1. **Upload Transcript**: Drag & drop a .txt file or paste text directly
2. **Select Instructions**: Choose from preset prompts or write custom instructions
3. **Generate**: Click "Generate Summary" to create the AI summary
4. **Edit**: Use the inline editor to modify the summary as needed
5. **Share**: Send via email to multiple team members

### Preset Instructions
- **Executive Summary**: Bullet-point format highlighting key decisions and outcomes
- **Action Items**: Focus on tasks, assignments, and next steps with ownership
- **Technical Details**: Technical specifications, requirements, and implementation details
- **Stakeholder Update**: High-level summary suitable for business stakeholders

## API Endpoints

- `POST /api/generate-summary` - Generate AI summary from transcript
- `POST /api/send-email` - Send summary via email
- `GET /api/debug-env` - Debug environment variables(used during dev)

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── generate-summary/   # AI summary generation
│   │   ├── send-email/         # Email sending
│   │   └── debug-env/          # Environment debugging
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── TranscriptUpload.tsx # Transcript upload with drag & drop
│   ├── CustomPrompt.tsx   # Custom instructions with presets
│   ├── SummaryDisplay.tsx # Summary display and inline editing
│   └── EmailShare.tsx     # Email sharing component
├── public/                 # Static assets
└── styles/                 # Additional styling
```

## Customization

### Adding New Preset Prompts
Edit `components/CustomPrompt.tsx` to add new preset instructions:

```typescript
const presetPrompts = [
  // ... existing prompts
  {
    title: 'New Format',
    description: 'Description of the new format',
    prompt: 'Your custom prompt here'
  }
]
```

### Modifying AI Behavior
Edit `app/api/generate-summary/route.ts` to customize the AI prompts and parameters:

```typescript
const completion = await groq.chat.completions.create({
  model: "llama3-8b-8192", // Change to other Groq models
  max_tokens: 1500, // Adjust token limit
  temperature: 0.5, // Adjust creativity level
  // ... other options
})
```

## Troubleshooting

### Common Issues

1. **Groq API Error**
   - Verify your API key is correct
   - Check your Groq account has sufficient credits
   - Ensure the API key has proper permissions

2. **Email Not Sending**
   - Verify SMTP credentials
   - Check firewall/network restrictions
   - For Gmail, ensure you're using an App Password

3. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Verify your environment variables are set correctly

## Recent Updates

### UI Simplifications
- **Streamlined Interface**: Cleaner, more focused design with better spacing
- **Improved Workflow**: Simplified step-by-step process for better user experience
- **Enhanced Editing**: Inline summary editing with a more intuitive interface
- **Better Mobile Experience**: Responsive design improvements for mobile devices
- **Preset Prompts**: Added smart preset instructions for common use cases

### Technical Improvements
- **Groq Integration**: Switched to Groq for faster, more efficient AI processing
- **API Optimization**: Improved API routes for better performance
- **Error Handling**: Enhanced error handling and user feedback
- **Code Organization**: Better component structure and separation of concerns
