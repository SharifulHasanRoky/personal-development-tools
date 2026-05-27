'use client'

import { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Target,
  Brain,
  Trash2,
  Timer,
} from 'lucide-react'

export default function DailyPlannerPage() {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' as const, status: 'todo' as const })
  
  // Pomodoro Timer
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(25 * 60) // 25 minutes
  const [timerType, setTimerType] = useState<'focus' | 'break'>('focus')
  const [pomodoroCount, setPomodoroCount] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1)
      }, 1000)
    } else if (timerSeconds === 0) {
      setTimerActive(false)
      if (timerType === 'focus') {
        setPomodoroCount(c => c + 1)
        setTimerType('break')
        setTimerSeconds(5 * 60)
      } else {
        setTimerType('focus')
        setTimerSeconds(25 * 60)
      }
    }
    return () => clearInterval(interval)
  }, [timerActive, timerSeconds, timerType])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setTimerActive(false)
    setTimerType('focus')
    setTimerSeconds(25 * 60)
  }

  const handleAddTask = () => {
    if (!newTask.title) return
    addTask({ ...newTask, userId: '1' })
    setNewTask({ title: '', priority: 'medium', status: 'todo' })
    setShowModal(false)
  }

  const todoTasks = tasks.filter(t => t.status === 'todo')
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress')
  const completedTasks = tasks.filter(t => t.status === 'completed')

  const aiPlan = {
    morning: [
      { time: '6:00 AM', task: 'Wake up + Morning routine', type: 'routine' },
      { time: '7:00 AM', task: 'Deep work: AI Project', type: 'deep-work' },
      { time: '9:00 AM', task: 'Skill practice: TypeScript', type: 'learning' },
    ],
    afternoon: [
      { time: '12:00 PM', task: 'Lunch + Rest', type: 'break' },
      { time: '1:00 PM', task: 'Project tasks', type: 'work' },
      { time: '3:00 PM', task: 'Exercise', type: 'health' },
    ],
    evening: [
      { time: '5:00 PM', task: 'Reading', type: 'growth' },
      { time: '7:00 PM', task: 'Evening review + Journal', type: 'reflection' },
      { time: '9:00 PM', task: 'Wind down + Plan tomorrow', type: 'routine' },
    ],
  }

  const typeColors: Record<string, string> = {
    'deep-work': 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    'learning': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    'break': 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400',
    'work': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'health': 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
    'growth': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    'reflection': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
    'routine': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-7 h-7 text-primary-500" />
              Daily Planner
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* To Do */}
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                  <Circle className="w-4 h-4 text-surface-400" />
                  To Do ({todoTasks.length})
                </h3>
                <div className="space-y-2">
                  {todoTasks.map((task) => (
                    <Card key={task.id} padding="sm" hover className="cursor-pointer">
                      <div className="flex items-start gap-2">
                        <button onClick={() => updateTaskStatus(task.id, 'in-progress')} className="mt-0.5">
                          <Circle className="w-4 h-4 text-surface-400 hover:text-primary-500" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-surface-700 dark:text-surface-300 truncate">{task.title}</p>
                          <Badge variant={task.priority === 'high' || task.priority === 'urgent' ? 'danger' : 'default'} size="sm" className="mt-1">
                            {task.priority}
                          </Badge>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-surface-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* In Progress */}
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary-500" />
                  In Progress ({inProgressTasks.length})
                </h3>
                <div className="space-y-2">
                  {inProgressTasks.map((task) => (
                    <Card key={task.id} padding="sm" hover className="cursor-pointer border-l-2 border-l-primary-500">
                      <div className="flex items-start gap-2">
                        <button onClick={() => updateTaskStatus(task.id, 'completed')} className="mt-0.5">
                          <Circle className="w-4 h-4 text-primary-500" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-surface-700 dark:text-surface-300 truncate">{task.title}</p>
                          <Badge variant="primary" size="sm" className="mt-1">active</Badge>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-surface-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Completed */}
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  Done ({completedTasks.length})
                </h3>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <Card key={task.id} padding="sm" className="opacity-60">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5" />
                        <p className="text-sm text-surface-500 line-through truncate flex-1">{task.title}</p>
                        <button onClick={() => deleteTask(task.id)} className="text-surface-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Schedule */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-surface-900 dark:text-white">AI-Generated Schedule</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(aiPlan).map(([period, items]) => (
                  <div key={period}>
                    <h4 className="text-xs font-semibold uppercase text-surface-500 mb-2 capitalize">{period}</h4>
                    <div className="space-y-2">
                      {items.map((item, i) => (
                        <div key={i} className={`p-2.5 rounded-lg ${typeColors[item.type] || typeColors['routine']}`}>
                          <p className="text-xs font-medium">{item.time}</p>
                          <p className="text-xs mt-0.5">{item.task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right - Timer & Stats */}
          <div className="space-y-4">
            {/* Pomodoro Timer */}
            <Card className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Timer className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-surface-900 dark:text-white">Focus Timer</h3>
              </div>
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-surface-100 dark:text-surface-800" />
                  <circle
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4"
                    className={timerType === 'focus' ? 'text-primary-500' : 'text-accent-500'}
                    strokeDasharray={`${(timerSeconds / (timerType === 'focus' ? 25 * 60 : 5 * 60)) * 283} 283`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-surface-900 dark:text-white">{formatTimer(timerSeconds)}</span>
                  <span className="text-xs text-surface-500 capitalize">{timerType}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button size="sm" variant="secondary" onClick={resetTimer}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button size="lg" onClick={() => setTimerActive(!timerActive)}>
                  {timerActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-xs text-surface-500">Pomodoros completed:</span>
                <Badge variant="primary">{pomodoroCount}</Badge>
              </div>
            </Card>

            {/* Daily Mission */}
            <Card variant="glass" className="border-primary-200/50 dark:border-primary-800/30">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-surface-900 dark:text-white text-sm">Today&apos;s Mission</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Complete 2 hours of deep work on your AI project and maintain your coding streak.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge variant="primary" size="sm">Deep Work</Badge>
                <Badge variant="accent" size="sm">Streak</Badge>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card padding="sm">
              <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Today&apos;s Progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-surface-500">Tasks Done</span>
                  <span className="text-sm font-semibold">{completedTasks.length}/{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-surface-500">Focus Time</span>
                  <span className="text-sm font-semibold">{pomodoroCount * 25} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-surface-500">Productivity</span>
                  <span className="text-sm font-semibold text-primary-500">
                    {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Add Task Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Task" size="sm">
          <div className="space-y-4">
            <Input
              label="Task"
              placeholder="What needs to be done?"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setNewTask({ ...newTask, priority: p })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      newTask.priority === p ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleAddTask} className="w-full">
              <Plus className="w-4 h-4" /> Add Task
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
