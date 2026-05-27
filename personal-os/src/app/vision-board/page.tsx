'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Image, Plus, Trash2, Sparkles } from 'lucide-react'

const defaultVisions = [
  { id: 'v1', title: 'Financial Freedom', description: 'Passive income exceeding expenses', category: 'Finance', emoji: '💰' },
  { id: 'v2', title: 'Master Developer', description: 'Build world-class AI products', category: 'Career', emoji: '💻' },
  { id: 'v3', title: 'Peak Health', description: 'Run marathon, 10% body fat', category: 'Health', emoji: '🏃' },
  { id: 'v4', title: 'Dream Home Office', description: 'Minimalist setup, mountain view', category: 'Lifestyle', emoji: '🏠' },
  { id: 'v5', title: 'Publish a Book', description: 'Share knowledge with the world', category: 'Creative', emoji: '📖' },
  { id: 'v6', title: 'Travel 30 Countries', description: 'Experience diverse cultures', category: 'Adventure', emoji: '✈️' },
]

export default function VisionBoardPage() {
  const { visionItems, addVisionItem, deleteVisionItem } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [newItem, setNewItem] = useState({ title: '', description: '', category: '', userId: '1' })

  const allItems = [...defaultVisions.map(v => ({ ...v, userId: '1', createdAt: '' })), ...visionItems]
  const categories = [...new Set(allItems.map(v => v.category))]

  const handleAdd = () => {
    if (!newItem.title) return
    addVisionItem(newItem)
    setNewItem({ title: '', description: '', category: '', userId: '1' })
    setShowModal(false)
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <Image className="w-7 h-7 text-rose-500" />
              Vision Board
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Visualize your dream life and stay motivated
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> Add Vision
          </Button>
        </div>

        {/* Inspiration Quote */}
        <Card variant="glass" className="border-rose-200/50 dark:border-rose-800/30 text-center py-8">
          <Sparkles className="w-8 h-8 text-rose-400 mx-auto mb-3" />
          <p className="text-lg font-medium text-surface-900 dark:text-white italic">
            &ldquo;The future belongs to those who believe in the beauty of their dreams.&rdquo;
          </p>
          <p className="text-sm text-surface-500 mt-2">- Eleanor Roosevelt</p>
        </Card>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allItems.map((item) => (
            <Card key={item.id} hover className="relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-purple-500 to-primary-500" />
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{'emoji' in item ? item.emoji : '⭐'}</span>
                  {item.createdAt && (
                    <button
                      onClick={() => deleteVisionItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-surface-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{item.description}</p>
                  )}
                </div>
                <Badge variant="outline" size="sm">{item.category}</Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Vision Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add to Vision Board" size="md">
          <div className="space-y-4">
            <Input
              label="Vision Title"
              placeholder="e.g., Dream Home"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <Input
              label="Description"
              placeholder="Describe your vision..."
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <Input
              label="Category"
              placeholder="e.g., Career, Lifestyle, Health"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <Button onClick={handleAdd} className="w-full">
              <Plus className="w-4 h-4" /> Add to Board
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
