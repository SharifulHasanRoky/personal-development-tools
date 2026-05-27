'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  BarChart3,
  TrendingUp,
  Brain,
  Target,
  Flame,
  Clock,
  Zap,
  Heart,
} from 'lucide-react'

export default function AnalyticsPage() {
  const { dailyStats, habits, goals, skills } = useAppStore()

  const weekStats = dailyStats.slice(-7)
  const monthStats = dailyStats.slice(-30)

  const avgProductivity = Math.round(weekStats.reduce((s, d) => s + d.productivityScore, 0) / weekStats.length)
  const avgFocus = Math.round(weekStats.reduce((s, d) => s + d.focusScore, 0) / weekStats.length)
  const avgMood = (weekStats.reduce((s, d) => s + d.moodScore, 0) / weekStats.length).toFixed(1)
  const totalSkillHours = weekStats.reduce((s, d) => s + d.skillPracticeHours, 0)
  const habitConsistency = Math.round(weekStats.reduce((s, d) => s + (d.habitsCompleted / d.totalHabits) * 100, 0) / weekStats.length)
  const goalCompletionRate = goals.length > 0 ? Math.round((goals.filter(g => g.status === 'completed').length / goals.length) * 100) : 0

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary-500" />
            Analytics
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Deep insights into your growth, productivity, and life patterns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard icon={<TrendingUp className="w-5 h-5" />} label="Productivity" value={`${avgProductivity}%`} color="text-primary-500" trend="+5%" />
          <MetricCard icon={<Target className="w-5 h-5" />} label="Focus" value={`${avgFocus}%`} color="text-blue-500" trend="+2%" />
          <MetricCard icon={<Heart className="w-5 h-5" />} label="Mood" value={`${avgMood}/5`} color="text-pink-500" trend="+0.3" />
          <MetricCard icon={<Flame className="w-5 h-5" />} label="Habit Rate" value={`${habitConsistency}%`} color="text-orange-500" trend="+8%" />
          <MetricCard icon={<Clock className="w-5 h-5" />} label="Skill Hours" value={`${totalSkillHours}h`} color="text-purple-500" trend="+3h" />
          <MetricCard icon={<Zap className="w-5 h-5" />} label="Goal Rate" value={`${goalCompletionRate}%`} color="text-accent-500" trend="+10%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Productivity Trend */}
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              Productivity Trend (30 days)
            </h3>
            <div className="flex items-end gap-1 h-40">
              {monthStats.map((stat, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full rounded-sm bg-gradient-to-t from-primary-500 to-primary-400 min-h-[2px] transition-all"
                    style={{ height: `${stat.productivityScore}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-surface-500">30 days ago</span>
              <span className="text-xs text-surface-500">Today</span>
            </div>
          </Card>

          {/* Focus Score */}
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Focus Score (30 days)
            </h3>
            <div className="flex items-end gap-1 h-40">
              {monthStats.map((stat, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full rounded-sm bg-gradient-to-t from-blue-500 to-blue-400 min-h-[2px] transition-all"
                    style={{ height: `${stat.focusScore}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-surface-500">30 days ago</span>
              <span className="text-xs text-surface-500">Today</span>
            </div>
          </Card>

          {/* Habit Consistency */}
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Habit Streaks
            </h3>
            <div className="space-y-3">
              {habits.sort((a, b) => b.streak - a.streak).map((habit) => (
                <div key={habit.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-surface-700 dark:text-surface-300">{habit.name}</span>
                    <span className="text-sm font-medium text-orange-500">{habit.streak}d</span>
                  </div>
                  <ProgressBar value={habit.streak} max={habit.bestStreak || 30} size="sm" color={habit.streak >= 14 ? 'accent' : 'warning'} />
                </div>
              ))}
            </div>
          </Card>

          {/* Skill Growth */}
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Skill Levels
            </h3>
            <div className="space-y-3">
              {skills.sort((a, b) => b.level - a.level).map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-surface-700 dark:text-surface-300">{skill.name}</span>
                    <Badge variant="primary" size="sm">L{skill.level}</Badge>
                  </div>
                  <ProgressBar value={skill.level} max={10} size="sm" color="primary" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Summary */}
        <Card variant="glass" className="border-primary-200/50 dark:border-primary-800/30">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-6 h-6 text-primary-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">AI Weekly Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-accent-500 mb-1">Strengths</h4>
              <ul className="text-xs text-surface-600 dark:text-surface-400 space-y-1">
                <li>• Consistent coding practice (30-day streak)</li>
                <li>• Morning routine stability</li>
                <li>• Improving focus scores</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-yellow-500 mb-1">Areas to Improve</h4>
              <ul className="text-xs text-surface-600 dark:text-surface-400 space-y-1">
                <li>• Social media discipline</li>
                <li>• Meditation consistency</li>
                <li>• Weekend productivity dips</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-primary-500 mb-1">Predictions</h4>
              <ul className="text-xs text-surface-600 dark:text-surface-400 space-y-1">
                <li>• Goal completion: 85% by Q4</li>
                <li>• Burnout risk: Low</li>
                <li>• Skill mastery: 2 months for AI/ML</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}

function MetricCard({ icon, label, value, color, trend }: { icon: React.ReactNode; label: string; value: string; color: string; trend: string }) {
  return (
    <Card padding="sm" className="text-center">
      <div className={`${color} mx-auto mb-2`}>{icon}</div>
      <p className="text-lg font-bold text-surface-900 dark:text-white">{value}</p>
      <p className="text-xs text-surface-500">{label}</p>
      <span className="text-xs text-accent-500 font-medium">{trend}</span>
    </Card>
  )
}
