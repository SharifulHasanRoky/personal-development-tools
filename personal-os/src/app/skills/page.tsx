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
  Zap,
  Plus,
  Trophy,
  Clock,
  TrendingUp,
  Star,
  Trash2,
  Award,
} from 'lucide-react'

export default function SkillsPage() {
  const { skills, addSkill, addSkillXp, deleteSkill } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Coding', level: 1, xp: 0, practiceHours: 0 })

  const totalHours = skills.reduce((sum, s) => sum + s.practiceHours, 0)
  const avgLevel = skills.length > 0 ? Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length) : 0

  const handleAddSkill = () => {
    if (!newSkill.name) return
    addSkill({ ...newSkill, userId: '1' })
    setNewSkill({ name: '', category: 'Coding', level: 1, xp: 0, practiceHours: 0 })
    setShowModal(false)
  }

  const skillCategories = ['Coding', 'Technology', 'Creative', 'Communication', 'Business', 'Health']

  const getLevelColor = (level: number) => {
    if (level >= 8) return 'from-yellow-400 to-yellow-600'
    if (level >= 6) return 'from-purple-400 to-purple-600'
    if (level >= 4) return 'from-primary-400 to-primary-600'
    return 'from-surface-400 to-surface-600'
  }

  const getLevelTitle = (level: number) => {
    if (level >= 9) return 'Master'
    if (level >= 7) return 'Expert'
    if (level >= 5) return 'Advanced'
    if (level >= 3) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <Zap className="w-7 h-7 text-yellow-500" />
              Skill Matrix
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Track, level up, and master your skills
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> Add Skill
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="sm" className="text-center">
            <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{skills.length}</p>
            <p className="text-xs text-surface-500">Skills Tracked</p>
          </Card>
          <Card padding="sm" className="text-center">
            <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">L{avgLevel}</p>
            <p className="text-xs text-surface-500">Avg Level</p>
          </Card>
          <Card padding="sm" className="text-center">
            <Clock className="w-6 h-6 text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{totalHours}h</p>
            <p className="text-xs text-surface-500">Total Practice</p>
          </Card>
          <Card padding="sm" className="text-center">
            <Award className="w-6 h-6 text-accent-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{skills.filter(s => s.level >= 7).length}</p>
            <p className="text-xs text-surface-500">Expert Level</p>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id} hover className="relative overflow-hidden">
              {/* Level indicator */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getLevelColor(skill.level)}`} />
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">{skill.name}</h3>
                    <Badge variant="outline" size="sm" className="mt-1">{skill.category}</Badge>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getLevelColor(skill.level)} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-sm">L{skill.level}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-surface-500">{getLevelTitle(skill.level)}</span>
                    <span className="text-xs text-surface-500">{skill.progressPercentage}%</span>
                  </div>
                  <ProgressBar value={skill.progressPercentage} size="md" color={skill.level >= 7 ? 'accent' : 'primary'} />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-100 dark:border-surface-800">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{skill.xp}</p>
                    <p className="text-xs text-surface-500">XP</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{skill.practiceHours}h</p>
                    <p className="text-xs text-surface-500">Practice</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">L{skill.level}</p>
                    <p className="text-xs text-surface-500">Level</p>
                  </div>
                </div>

                {skill.weaknesses.length > 0 && (
                  <div className="pt-2 border-t border-surface-100 dark:border-surface-800">
                    <p className="text-xs text-surface-500 mb-1">Areas to improve:</p>
                    <div className="flex flex-wrap gap-1">
                      {skill.weaknesses.map((w, i) => (
                        <Badge key={i} variant="warning" size="sm">{w}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Button size="sm" variant="secondary" onClick={() => addSkillXp(skill.id, 50)}>
                    <Zap className="w-3 h-3" /> +50 XP
                  </Button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Skill Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Skill" size="md">
          <div className="space-y-4">
            <Input
              label="Skill Name"
              placeholder="e.g., Machine Learning"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {skillCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewSkill({ ...newSkill, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      newSkill.category === cat ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Current Level (1-10)"
              type="number"
              min="1"
              max="10"
              value={newSkill.level.toString()}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 1 })}
            />
            <Input
              label="Practice Hours"
              type="number"
              value={newSkill.practiceHours.toString()}
              onChange={(e) => setNewSkill({ ...newSkill, practiceHours: parseInt(e.target.value) || 0 })}
            />
            <Button onClick={handleAddSkill} className="w-full">
              <Plus className="w-4 h-4" /> Add Skill
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
