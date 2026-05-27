# Personal OS - AI-Powered Life Command Center

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Auth-green)

An advanced AI-powered Personal Development Operating System that helps you manage, improve, analyze, and optimize every area of life.

## Features

### Core Systems
- **Dashboard** - Personalized daily overview with productivity scores, mood tracking, and AI recommendations
- **AI Mentor** - Intelligent life coach that analyzes behavior, detects burnout, and provides actionable advice
- **Daily Planner** - Smart scheduling with Pomodoro timer, time blocking, and AI-generated plans
- **Goal Management** - Track short/long-term goals with milestones, progress bars, and AI insights
- **Skill Matrix** - XP-based skill leveling system with practice tracking and growth analysis
- **Habit Tracker** - Streak tracking, heatmaps, XP rewards, and AI habit analysis
- **Finance Dashboard** - Income/expense tracking, spending analysis, and AI savings tips
- **Journal** - Mood tracking, gratitude journaling, reflection prompts, and emotional patterns
- **Notes** - Rich note-taking with tags, categories, and search
- **Knowledge Vault** - Second-brain system for ideas, research, and strategies
- **Projects** - Kanban-style project management with progress tracking
- **Analytics** - Comprehensive life analytics with charts and AI summaries
- **Vision Board** - Dream visualization and motivation system
- **Gamification** - XP, levels, achievements, and streaks

### Design
- Glassmorphism UI with smooth animations
- Dark/Light mode
- Responsive design (mobile + desktop)
- Clean, modern, futuristic aesthetic

### Security
- Login/Register system
- Lock screen with PIN
- JWT authentication ready
- Session management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Custom glassmorphism components
- **State**: Zustand (with persistence)
- **Auth**: Supabase Auth ready
- **Database**: Supabase/PostgreSQL ready
- **AI**: OpenAI API integration ready
- **Icons**: Lucide React
- **Animations**: CSS + Framer Motion ready

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd personal-os
npm install
```

### Configuration

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── ai-mentor/         # AI chat interface
│   ├── daily-planner/     # Task management + timer
│   ├── goals/             # Goal tracking
│   ├── skills/            # Skill matrix
│   ├── habits/            # Habit tracker
│   ├── finance/           # Financial dashboard
│   ├── journal/           # Daily journaling
│   ├── notes/             # Note-taking
│   ├── knowledge-vault/   # Second brain
│   ├── projects/          # Project management
│   ├── analytics/         # Life analytics
│   ├── vision-board/      # Dream visualization
│   └── settings/          # App settings
├── components/
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── stores/                # Zustand state management
├── lib/                   # Utilities and config
├── types/                 # TypeScript types
└── hooks/                 # Custom React hooks
```

## Demo

Use any email and password (6+ characters) to login. The app comes pre-loaded with sample data for demonstration.

## Deployment

Ready for deployment on Vercel:

```bash
vercel
```

## License

MIT
