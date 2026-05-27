'use client'

import { useState, useRef, useEffect } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Brain,
  Send,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
  Zap,
  RefreshCw,
} from 'lucide-react'

const aiSuggestions = [
  "What should I focus on today?",
  "Analyze my productivity this week",
  "Create a morning routine for me",
  "How can I improve my coding skills faster?",
  "Detect if I'm at risk of burnout",
  "Generate a weekly learning plan",
]

const aiResponses: Record<string, string> = {
  "What should I focus on today?": `Based on your current goals and habits, here's my recommendation for today:

**Priority Focus: Deep Work on AI Project** (2 hours)
Your "Master AI Automation" goal is at 65% - you need consistent daily progress.

**Secondary Tasks:**
1. Complete your morning routine habits (wake early, workout, read)
2. Review and plan tomorrow's tasks
3. 30 min skill practice on TypeScript

**Avoid:**
- Social media scrolling (your streak is only 3 days)
- Context switching between projects

Your energy levels are typically highest between 9-11 AM. Block that time for deep work.`,
  
  "Analyze my productivity this week": `📊 **Weekly Productivity Analysis**

**Overall Score: 78/100** (↑ 5% from last week)

**Strengths:**
- Coding streak maintained: 30 days 🔥
- Reading habit consistent: 21 days
- 4/6 daily habits completed on average

**Areas of Concern:**
- Focus score dropped 8% on Wednesday
- Social media habit broken multiple times
- Meditation streak is only at 5 days

**Patterns Detected:**
- Your productivity peaks on Tuesday-Thursday
- You tend to skip workouts on weekends
- Deep work sessions average only 45 min (target: 90 min)

**Recommendation:**
Implement time-blocking for deep work. Set a phone-free zone from 9 AM - 12 PM.`,

  "Create a morning routine for me": `🌅 **Optimized Morning Routine**

Based on your habits, goals, and energy patterns:

**5:30 AM** - Wake up (consistent with your wake-early habit)
**5:35 AM** - Hydrate + 5 min stretching
**5:45 AM** - Meditation (10 min) - builds your streak
**6:00 AM** - Workout (30 min) - high energy activity
**6:30 AM** - Cold shower + get ready
**7:00 AM** - Journaling (reflection + gratitude)
**7:15 AM** - Skill practice / learning (45 min)
**8:00 AM** - Breakfast + daily planning
**8:30 AM** - Deep work block begins

**Key Principles:**
- No phone for first 60 minutes
- Stack habits together for consistency
- Start with hardest physical activity when cortisol is high
- Learning happens best in morning state

This routine supports 4 of your active habits simultaneously.`,

  "default": `I've analyzed your current data and here's what I see:

**Current Status:**
- You're maintaining good momentum with a 30-day coding streak
- Your reading habit is strong at 21 days
- Financial tracking shows positive savings trend

**Areas for Improvement:**
- Meditation consistency needs work (only 5 days)
- Social media boundaries (3-day streak)
- Workout could be more regular

**My Recommendation:**
Focus on building one habit at a time. Your coding and reading habits are solid - now channel that same discipline into meditation. Start with just 5 minutes instead of the full 10.

Would you like me to create a specific plan for any of these areas?`
}

export default function AIMentorPage() {
  const { aiMessages, addAIMessage, habits, goals, skills, dailyStats } = useAppStore()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [aiMessages])

  const handleSend = async (message?: string) => {
    const text = message || input
    if (!text.trim()) return

    addAIMessage({ role: 'user', content: text })
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const response = aiResponses[text] || aiResponses['default']
    addAIMessage({ role: 'assistant', content: response })
    setIsTyping(false)
  }

  const completedHabits = habits.filter(h => h.completedToday).length
  const activeGoals = goals.filter(g => g.status === 'active').length
  const avgProductivity = dailyStats.slice(-7).reduce((sum, s) => sum + s.productivityScore, 0) / 7

  return (
    <MainLayout>
      <div className="h-[calc(100vh-5rem)] flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <Brain className="w-7 h-7 text-primary-500" />
              AI Mentor
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Your personal AI coach for growth and productivity
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {aiMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                      Your AI Life Coach
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 max-w-md">
                      I analyze your habits, goals, and productivity to give personalized advice.
                      Ask me anything about your growth journey.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-lg">
                      {aiSuggestions.slice(0, 4).map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSend(suggestion)}
                          className="text-xs px-3 py-2 rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {aiMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-primary-500 text-white rounded-br-md'
                          : 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100 rounded-bl-md'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-surface-200 dark:border-surface-800">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask your AI mentor anything..."
                    className="flex-1 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  />
                  <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Quick Stats */}
          <div className="hidden lg:flex flex-col w-72 gap-4">
            <Card padding="sm">
              <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary-500" />
                Quick Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-surface-500">Avg Productivity</span>
                  <span className="text-sm font-semibold text-primary-500">{Math.round(avgProductivity)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-surface-500">Habits Today</span>
                  <span className="text-sm font-semibold text-accent-500">{completedHabits}/{habits.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-surface-500">Active Goals</span>
                  <span className="text-sm font-semibold text-yellow-500">{activeGoals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-surface-500">Skills Tracked</span>
                  <span className="text-sm font-semibold text-purple-500">{skills.length}</span>
                </div>
              </div>
            </Card>

            <Card padding="sm">
              <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Suggestions
              </h4>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="w-full text-left text-xs p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800/50 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </Card>

            <Card padding="sm" className="border-yellow-200/50 dark:border-yellow-800/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <h4 className="text-sm font-semibold text-surface-900 dark:text-white">Burnout Risk</h4>
              </div>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Low risk detected. Your work-rest balance is healthy. Keep maintaining regular breaks.
              </p>
              <Badge variant="accent" size="sm" className="mt-2">Low Risk</Badge>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
