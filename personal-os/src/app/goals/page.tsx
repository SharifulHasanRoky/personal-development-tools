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
  Target,
  Plus,
  Calendar,
  Flag,
  CheckCircle2,
  TrendingUp,
  Trash2,
  Edit3,
} from 'lucide-react'

export default function GoalsPage() {
  const { goals, addGoal, updateGoalProgress, deleteGoal } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'short-term' as const,
    priority: 'medium' as const,
    progress: 0,
    targetDate: '',
    status: 'active' as const,
  })

  const filteredGoals = filter === 'all' ? goals : goals.filter(g => g.category === filter || g.status === filter)
  const activeGoals = goals.filter(g => g.status === 'active')
  const completedGoals = goals.filter(g => g.status === 'completed')
  const avgProgress = activeGoals.length > 0 ? Math.round(activeGoals.reduce((sum, g) => sum + g.progress, 0) / activeGoals.length) : 0

  const handleAddGoal = () => {
    if (!newGoal.title) return
    addGoal({ ...newGoal, userId: '1' })
    setNewGoal({ title: '', description: '', category: 'short-term', priority: 'medium', progress: 0, targetDate: '', status: 'active' })
    setShowModal(false)
  }

  const priorityColors = {
    low: 'default',
    medium: 'warning',
    high: 'danger',
    critical: 'danger',
  } as const

  const categoryIcons = {
    'short-term': '🎯',
    'long-term': '🚀',
    'financial': '💰',
    'skill': '⚡',
    'health': '❤️',
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <Target className="w-7 h-7 text-accent-500" />
              Goals
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Set, track, and crush your life goals
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> New Goal
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{activeGoals.length}</p>
            <p className="text-xs text-surface-500">Active Goals</p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-accent-500">{completedGoals.length}</p>
            <p className="text-xs text-surface-500">Completed</p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-primary-500">{avgProgress}%</p>
            <p className="text-xs text-surface-500">Avg Progress</p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-yellow-500">{goals.filter(g => g.priority === 'high' || g.priority === 'critical').length}</p>
            <p className="text-xs text-surface-500">High Priority</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'short-term', 'long-term', 'financial', 'skill', 'health', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGoals.map((goal) => (
            <Card key={goal.id} hover className="relative overflow-hidden">
              {goal.status === 'completed' && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-6 h-6 text-accent-500" />
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{categoryIcons[goal.category] || '🎯'}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-surface-900 dark:text-white">{goal.title}</h3>
                    {goal.description && (
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{goal.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={priorityColors[goal.priority]} size="sm">{goal.priority}</Badge>
                  <Badge variant="outline" size="sm">{goal.category}</Badge>
                  {goal.targetDate && (
                    <div className="flex items-center gap-1 text-xs text-surface-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <ProgressBar value={goal.progress} showLabel color={goal.progress >= 60 ? 'accent' : 'primary'} />

                {/* Milestones */}
                {goal.milestones.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-surface-100 dark:border-surface-800">
                    {goal.milestones.map((m) => (
                      <div key={m.id} className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          m.completed ? 'border-accent-500 bg-accent-500' : 'border-surface-300 dark:border-surface-600'
                        }`}>
                          {m.completed && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className={`text-xs ${m.completed ? 'text-surface-400 line-through' : 'text-surface-600 dark:text-surface-400'}`}>
                          {m.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                      className="w-24 h-1.5 accent-primary-500"
                    />
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Goal Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Goal" size="md">
          <div className="space-y-4">
            <Input
              label="Goal Title"
              placeholder="e.g., Master AI Automation"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
            <Input
              label="Description"
              placeholder="What does success look like?"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {(['short-term', 'long-term', 'financial', 'skill', 'health'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewGoal({ ...newGoal, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      newGoal.category === cat ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {categoryIcons[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high', 'critical'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setNewGoal({ ...newGoal, priority: p })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      newGoal.priority === p ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Target Date"
              type="date"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
            />
            <Button onClick={handleAddGoal} className="w-full">
              <Plus className="w-4 h-4" /> Create Goal
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
