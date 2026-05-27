'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  Repeat,
  Plus,
  Flame,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Calendar,
  Zap,
  Trash2,
} from 'lucide-react'

export default function HabitsPage() {
  const { habits, addHabit, toggleHabit, deleteHabit, addXp } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [newHabit, setNewHabit] = useState({ name: '', description: '', category: 'routine', frequency: 'daily' as const, xpReward: 20 })

  const completedCount = habits.filter(h => h.completedToday).length
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0)
  const bestStreak = Math.max(...habits.map(h => h.bestStreak), 0)

  const handleAddHabit = () => {
    if (!newHabit.name) return
    addHabit({ ...newHabit, userId: '1' })
    setNewHabit({ name: '', description: '', category: 'routine', frequency: 'daily', xpReward: 20 })
    setShowModal(false)
  }

  const handleToggle = (id: string, xpReward: number, completedToday: boolean) => {
    toggleHabit(id)
    if (!completedToday) {
      addXp(xpReward)
    }
  }

  const categories = ['routine', 'health', 'growth', 'wellness', 'skill', 'focus']

  // Generate heatmap data (last 28 days)
  const heatmapData = Array.from({ length: 28 }, (_, i) => ({
    date: new Date(Date.now() - (27 - i) * 86400000),
    completed: Math.floor(Math.random() * habits.length) + 1,
    total: habits.length,
  }))

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <Repeat className="w-7 h-7 text-orange-500" />
              Habit Tracker
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Build powerful habits, earn XP, and track your streaks
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> New Habit
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="sm" className="text-center">
            <CheckCircle2 className="w-6 h-6 text-accent-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{completedCount}/{habits.length}</p>
            <p className="text-xs text-surface-500">Completed Today</p>
          </Card>
          <Card padding="sm" className="text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{totalStreak}</p>
            <p className="text-xs text-surface-500">Total Streak Days</p>
          </Card>
          <Card padding="sm" className="text-center">
            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{bestStreak}</p>
            <p className="text-xs text-surface-500">Best Streak</p>
          </Card>
          <Card padding="sm" className="text-center">
            <Zap className="w-6 h-6 text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{Math.round((completedCount / habits.length) * 100)}%</p>
            <p className="text-xs text-surface-500">Completion Rate</p>
          </Card>
        </div>

        {/* Heatmap */}
        <Card>
          <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            Habit Heatmap (Last 28 days)
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
              <div key={day} className="text-center text-xs text-surface-500 mb-1">{day}</div>
            ))}
            {heatmapData.map((day, i) => {
              const intensity = day.completed / day.total
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md transition-all ${
                    intensity >= 0.8 ? 'bg-accent-500' :
                    intensity >= 0.6 ? 'bg-accent-400' :
                    intensity >= 0.4 ? 'bg-accent-300 dark:bg-accent-700' :
                    intensity >= 0.2 ? 'bg-accent-200 dark:bg-accent-800' :
                    'bg-surface-100 dark:bg-surface-800'
                  }`}
                  title={`${day.completed}/${day.total} completed`}
                />
              )
            })}
          </div>
        </Card>

        {/* Habits List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((habit) => (
            <Card key={habit.id} hover className="relative overflow-hidden">
              {habit.completedToday && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              )}
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggle(habit.id, habit.xpReward, habit.completedToday)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    habit.completedToday
                      ? 'border-accent-500 bg-accent-500 scale-110'
                      : 'border-surface-300 dark:border-surface-600 hover:border-primary-500'
                  }`}
                >
                  {habit.completedToday && <CheckCircle2 className="w-5 h-5 text-white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${habit.completedToday ? 'text-accent-600 dark:text-accent-400' : 'text-surface-900 dark:text-white'}`}>
                      {habit.name}
                    </h4>
                    <Badge variant={habit.completedToday ? 'accent' : 'default'} size="sm">
                      {habit.category}
                    </Badge>
                  </div>
                  {habit.description && (
                    <p className="text-xs text-surface-500 dark:text-surface-400 mb-2">{habit.description}</p>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-xs font-medium text-surface-600 dark:text-surface-400">{habit.streak} day streak</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="text-xs font-medium text-surface-600 dark:text-surface-400">+{habit.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-primary-400" />
                      <span className="text-xs font-medium text-surface-600 dark:text-surface-400">Best: {habit.bestStreak}d</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Habit Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Habit" size="md">
          <div className="space-y-4">
            <Input
              label="Habit Name"
              placeholder="e.g., Wake up at 6 AM"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            />
            <Input
              label="Description (optional)"
              placeholder="Brief description"
              value={newHabit.description}
              onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewHabit({ ...newHabit, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      newHabit.category === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Frequency</label>
              <div className="flex gap-2">
                {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setNewHabit({ ...newHabit, frequency: freq })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      newHabit.frequency === freq
                        ? 'bg-primary-500 text-white'
                        : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="XP Reward"
              type="number"
              value={newHabit.xpReward.toString()}
              onChange={(e) => setNewHabit({ ...newHabit, xpReward: parseInt(e.target.value) || 0 })}
            />
            <Button onClick={handleAddHabit} className="w-full">
              <Plus className="w-4 h-4" /> Create Habit
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
