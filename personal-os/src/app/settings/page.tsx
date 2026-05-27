'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { calculateLevel } from '@/lib/utils'
import {
  Settings,
  User,
  Palette,
  Bell,
  Shield,
  Moon,
  Sun,
  Trophy,
  Zap,
  Award,
  Lock,
} from 'lucide-react'
import { useState } from 'react'

const accentColors = [
  { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
  { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
  { name: 'Green', value: 'green', class: 'bg-green-500' },
  { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
  { name: 'Rose', value: 'rose', class: 'bg-rose-500' },
  { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
]

export default function SettingsPage() {
  const { theme, toggleTheme, accentColor, setAccentColor, totalXp, achievements } = useAppStore()
  const { user, setPin } = useAuthStore()
  const [newPin, setNewPin] = useState('')
  const [pinSaved, setPinSaved] = useState(false)
  const { level, currentXp, nextLevelXp } = calculateLevel(totalXp)

  const handleSetPin = () => {
    if (newPin.length === 4) {
      setPin(newPin)
      setPinSaved(true)
      setNewPin('')
      setTimeout(() => setPinSaved(false), 3000)
    }
  }

  const unlockedAchievements = achievements.filter(a => a.unlockedAt)
  const lockedAchievements = achievements.filter(a => !a.unlockedAt)

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <Settings className="w-7 h-7 text-surface-500" />
            Settings
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Customize your Personal OS experience
          </p>
        </div>

        {/* Profile Section */}
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-white">{user?.fullName}</h3>
              <p className="text-sm text-surface-500">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="primary">Level {level}</Badge>
                <span className="text-xs text-surface-500">{totalXp} XP total</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar value={currentXp} max={nextLevelXp} showLabel label={`Level ${level} → ${level + 1}`} />
          </div>
        </Card>

        {/* Theme Settings */}
        <Card>
          <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary-500" />
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-300">Dark Mode</p>
                <p className="text-xs text-surface-500">Toggle between light and dark themes</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-primary-500' : 'bg-surface-300'
                }`}
              >
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'
                }`}>
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-primary-500 m-1" /> : <Sun className="w-4 h-4 text-yellow-500 m-1" />}
                </div>
              </button>
            </div>

            <div>
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Accent Color</p>
              <div className="flex gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className={`w-8 h-8 rounded-full ${color.class} transition-all ${
                      accentColor === color.value ? 'ring-2 ring-offset-2 ring-surface-400 scale-110' : 'hover:scale-105'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent-500" />
            Security
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Lock Screen PIN</p>
              <p className="text-xs text-surface-500 mb-3">Set a 4-digit PIN to lock your dashboard</p>
              <div className="flex items-center gap-3">
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 4-digit PIN"
                  className="w-40 px-4 py-2 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-center tracking-widest"
                />
                <Button size="sm" onClick={handleSetPin} disabled={newPin.length !== 4}>
                  <Lock className="w-4 h-4" /> Set PIN
                </Button>
                {pinSaved && <span className="text-xs text-accent-500">PIN saved!</span>}
              </div>
            </div>
          </div>
        </Card>

        {/* Gamification / Achievements */}
        <Card>
          <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Achievements ({unlockedAchievements.length}/{achievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  achievement.unlockedAt
                    ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/50'
                    : 'bg-surface-50 dark:bg-surface-800/30 border-surface-200 dark:border-surface-700 opacity-60'
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{achievement.title}</p>
                    {achievement.unlockedAt && <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-surface-500 truncate">{achievement.description}</p>
                  <div className="mt-1">
                    <ProgressBar value={achievement.progress} max={achievement.maxProgress} size="sm" color={achievement.unlockedAt ? 'accent' : 'primary'} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            Notifications
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Habit Reminders', desc: 'Get reminded to complete daily habits', enabled: true },
              { label: 'Goal Updates', desc: 'Progress updates on your goals', enabled: true },
              { label: 'AI Insights', desc: 'Weekly AI analysis of your productivity', enabled: true },
              { label: 'Deep Work Alerts', desc: 'Notifications to start focus sessions', enabled: false },
              { label: 'Financial Alerts', desc: 'Budget warnings and savings tips', enabled: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{item.label}</p>
                  <p className="text-xs text-surface-500">{item.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${item.enabled ? 'bg-primary-500' : 'bg-surface-300 dark:bg-surface-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mt-0.5 ${item.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}
