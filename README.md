# MangoDesk - AI Meeting Notes Summarizer

An AI-powered web application that automatically generates structured summaries from meeting transcripts and allows easy sharing via email.

## Features

- **📝 Transcript Upload**: Drag & drop or paste meeting transcripts
- **🤖 AI-Powered Summarization**: Uses OpenAI GPT to generate intelligent summaries
- **⚙️ Custom Instructions**: Specify how you want the AI to summarize (executive format, action items, etc.)
- **✏️ Editable Summaries**: Review and edit generated summaries before sharing
- **📧 Email Sharing**: Send summaries directly to team members via email
- **🎨 Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS

## How It Works

1. **Upload Transcript**: Paste or upload your meeting transcript
2. **Custom Instructions**: Add specific instructions for the AI (optional)
3. **Generate Summary**: Click to create an AI-powered summary
4. **Edit & Review**: Make any necessary adjustments to the summary
5. **Share**: Send the final summary to team members via email

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Groq (Llama 3.1 8B)
- **Email**: Nodemailer
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ 
- Groq API key
- SMTP email credentials (Gmail, Outlook, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

### Other Providers
- **Outlook**: Use `smtp-mail.outlook.com` with port 587
- **Yahoo**: Use `smtp.mail.yahoo.com` with port 587
- **Custom SMTP**: Use your provider's SMTP settings

## Usage

### Basic Workflow
1. **Upload Transcript**: Drag & drop a .txt file or paste text directly
2. **Add Instructions**: Use preset prompts or write custom instructions
3. **Generate**: Click "Generate Summary" to create the AI summary
4. **Edit**: Review and modify the summary as needed
5. **Share**: Send via email to team members

### Custom Instructions Examples
- "Summarize in bullet points for executives"
- "Highlight only action items and next steps"
- "Focus on technical specifications and requirements"
- "Create a stakeholder-friendly summary"

## API Endpoints

- `POST /api/send-email` - Send summary via email
- Uses Nodemailer for SMTP email delivery

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
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── Header.tsx         # Application header
│   ├── TranscriptUpload.tsx # Transcript upload component
│   ├── CustomPrompt.tsx   # Custom instructions input
│   ├── SummaryDisplay.tsx # Summary display and editing
│   └── EmailShare.tsx     # Email sharing component
├── app/api/                # API routes
│   ├── generate-summary/   # AI summary generation
│   ├── send-email/         # Email sending
│   └── debug-env/          # Environment debugging
└── public/                 # Static assets
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
  model: "llama3-8b-8192", // Change to other Groq models for different quality
  max_tokens: 1500, // Increase token limit
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

## Roadmap

- [ ] Multiple AI model support
- [ ] Summary templates and themes
- [ ] Team collaboration features
- [ ] Integration with calendar apps
- [ ] Export to various formats (PDF, Word, etc.)
- [ ] Meeting recording upload support
- [ ] Advanced analytics and insights
