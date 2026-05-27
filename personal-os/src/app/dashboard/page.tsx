'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { getGreeting, calculateLevel } from '@/lib/utils'
import {
  Brain,
  Target,
  Zap,
  TrendingUp,
  CheckCircle2,
  Clock,
  Flame,
  Heart,
  Battery,
  Focus,
  DollarSign,
  Calendar,
  Trophy,
  Quote,
  Timer,
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { habits, goals, skills, tasks, transactions, dailyStats, totalXp, achievements } = useAppStore()

  const todayStats = dailyStats[dailyStats.length - 1]
  const completedHabits = habits.filter(h => h.completedToday).length
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const activeGoals = goals.filter(g => g.status === 'active')
  const { level, currentXp, nextLevelXp } = calculateLevel(totalXp)

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

  const quotes = [
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Your future is created by what you do today, not tomorrow.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
  ]
  const dailyQuote = quotes[new Date().getDate() % quotes.length]

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              {getGreeting()}, {user?.fullName?.split(' ')[0] || 'User'} 👋
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Here&apos;s your personal growth overview for today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Card variant="glass" padding="sm" className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">Level {level}</span>
              <div className="w-20">
                <ProgressBar value={currentXp} max={nextLevelXp} size="sm" color="primary" />
              </div>
              <span className="text-xs text-surface-500">{currentXp}/{nextLevelXp} XP</span>
            </Card>
          </div>
        </div>

        {/* Score Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ScoreCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Productivity"
            value={`${todayStats?.productivityScore || 0}%`}
            color="text-primary-500"
            bgColor="bg-primary-50 dark:bg-primary-950/30"
          />
          <ScoreCard
            icon={<Heart className="w-5 h-5" />}
            label="Mood"
            value={`${todayStats?.moodScore || 0}/5`}
            color="text-pink-500"
            bgColor="bg-pink-50 dark:bg-pink-950/30"
          />
          <ScoreCard
            icon={<Battery className="w-5 h-5" />}
            label="Energy"
            value={`${todayStats?.energyLevel || 0}/5`}
            color="text-yellow-500"
            bgColor="bg-yellow-50 dark:bg-yellow-950/30"
          />
          <ScoreCard
            icon={<Focus className="w-5 h-5" />}
            label="Focus"
            value={`${todayStats?.focusScore || 0}%`}
            color="text-accent-500"
            bgColor="bg-accent-50 dark:bg-accent-950/30"
          />
          <ScoreCard
            icon={<Flame className="w-5 h-5" />}
            label="Streak"
            value={`${Math.max(...habits.map(h => h.streak))}d`}
            color="text-orange-500"
            bgColor="bg-orange-50 dark:bg-orange-950/30"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Tasks */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  Today&apos;s Tasks
                </h3>
                <Badge variant="primary">{completedTasks}/{tasks.length} done</Badge>
              </div>
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      task.status === 'completed' ? 'border-accent-500 bg-accent-500' : 'border-surface-300 dark:border-surface-600'
                    }`}>
                      {task.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`flex-1 text-sm ${task.status === 'completed' ? 'line-through text-surface-400' : 'text-surface-700 dark:text-surface-300'}`}>
                      {task.title}
                    </span>
                    <Badge variant={task.priority === 'high' || task.priority === 'urgent' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'} size="sm">
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Habits Progress */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  Habit Completion
                </h3>
                <Badge variant="accent">{completedHabits}/{habits.length}</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`p-3 rounded-xl border transition-all ${
                      habit.completedToday
                        ? 'bg-accent-50 dark:bg-accent-950/30 border-accent-200 dark:border-accent-800'
                        : 'bg-surface-50 dark:bg-surface-800/50 border-surface-200 dark:border-surface-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {habit.completedToday ? (
                        <CheckCircle2 className="w-4 h-4 text-accent-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-surface-300 dark:border-surface-600" />
                      )}
                      <span className="text-xs font-medium text-surface-700 dark:text-surface-300 truncate">
                        {habit.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 ml-6">
                      <Flame className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-surface-500">{habit.streak}d streak</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weekly Productivity Graph */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                  Weekly Growth
                </h3>
              </div>
              <div className="flex items-end gap-2 h-32">
                {dailyStats.slice(-7).map((stat, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-primary-500 to-primary-400 transition-all duration-500"
                      style={{ height: `${stat.productivityScore}%` }}
                    />
                    <span className="text-xs text-surface-500">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Recommendation */}
            <Card variant="glass" className="border-primary-200 dark:border-primary-800/50">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-surface-900 dark:text-white">AI Insight</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                Your coding consistency is impressive! 30-day streak maintained. 
                Consider adding 30 minutes of system design study to advance your career goals.
                Focus score is down 8% - try the Pomodoro technique today.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge variant="primary" size="sm">Productivity</Badge>
                <Badge variant="accent" size="sm">Suggestion</Badge>
              </div>
            </Card>

            {/* Goals Progress */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent-500" />
                  Active Goals
                </h3>
              </div>
              <div className="space-y-4">
                {activeGoals.slice(0, 4).map((goal) => (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300 truncate">{goal.title}</span>
                      <span className="text-xs text-surface-500">{goal.progress}%</span>
                    </div>
                    <ProgressBar value={goal.progress} size="sm" color={goal.progress >= 60 ? 'accent' : 'primary'} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills Overview */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Top Skills
                </h3>
              </div>
              <div className="space-y-3">
                {skills.slice(0, 4).map((skill) => (
                  <div key={skill.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">L{skill.level}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{skill.name}</span>
                        <span className="text-xs text-surface-500">{skill.practiceHours}h</span>
                      </div>
                      <ProgressBar value={skill.progressPercentage} size="sm" color="primary" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Finance Quick View */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-accent-500" />
                  Finance
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-accent-50 dark:bg-accent-950/30">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Income</span>
                  <span className="text-sm font-semibold text-accent-600 dark:text-accent-400">${totalIncome.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-950/30">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Expenses</span>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">${totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-primary-50 dark:bg-primary-950/30">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Net</span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">${(totalIncome - totalExpenses).toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Daily Quote */}
            <Card variant="glass" className="border-yellow-200/50 dark:border-yellow-800/30">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm italic text-surface-600 dark:text-surface-400 leading-relaxed">
                  &ldquo;{dailyQuote}&rdquo;
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function ScoreCard({ icon, label, value, color, bgColor }: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  bgColor: string
}) {
  return (
    <Card hover className="flex flex-col items-center justify-center py-4 gap-2">
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <span className="text-xl font-bold text-surface-900 dark:text-white">{value}</span>
      <span className="text-xs text-surface-500 dark:text-surface-400">{label}</span>
    </Card>
  )
}
