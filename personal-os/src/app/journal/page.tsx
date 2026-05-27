'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  BookOpen,
  Plus,
  Heart,
  Smile,
  Meh,
  Frown,
  ThumbsUp,
  Sparkles,
  Calendar,
} from 'lucide-react'

const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩']
const moodLabels = ['Bad', 'Low', 'Okay', 'Good', 'Great']

export default function JournalPage() {
  const { journalEntries, addJournalEntry } = useAppStore()
  const [isWriting, setIsWriting] = useState(false)
  const [entry, setEntry] = useState({
    content: '',
    mood: 3 as 1 | 2 | 3 | 4 | 5,
    energy: 3 as 1 | 2 | 3 | 4 | 5,
    gratitude: ['', '', ''],
    reflections: '',
    tags: [] as string[],
    date: new Date().toISOString().split('T')[0],
  })
  const [tagInput, setTagInput] = useState('')

  const handleSave = () => {
    if (!entry.content) return
    addJournalEntry({
      ...entry,
      userId: '1',
      gratitude: entry.gratitude.filter(g => g.trim()),
    })
    setEntry({ content: '', mood: 3, energy: 3, gratitude: ['', '', ''], reflections: '', tags: [], date: new Date().toISOString().split('T')[0] })
    setIsWriting(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !entry.tags.includes(tagInput.trim())) {
      setEntry({ ...entry, tags: [...entry.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const prompts = [
    "What am I grateful for today?",
    "What was the highlight of my day?",
    "What did I learn today?",
    "What challenge did I overcome?",
    "How can I improve tomorrow?",
    "What made me smile today?",
  ]

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-pink-500" />
              Journal
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Reflect, grow, and track your emotional journey
            </p>
          </div>
          <Button onClick={() => setIsWriting(true)}>
            <Plus className="w-4 h-4" /> New Entry
          </Button>
        </div>

        {isWriting ? (
          /* Writing Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-surface-500">
                    <Calendar className="w-4 h-4" />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>

                  {/* Mood */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">How are you feeling?</label>
                    <div className="flex gap-3">
                      {([1, 2, 3, 4, 5] as const).map((mood) => (
                        <button
                          key={mood}
                          onClick={() => setEntry({ ...entry, mood })}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                            entry.mood === mood ? 'bg-primary-100 dark:bg-primary-900/30 scale-110' : 'hover:bg-surface-100 dark:hover:bg-surface-800'
                          }`}
                        >
                          <span className="text-2xl">{moodEmojis[mood - 1]}</span>
                          <span className="text-xs text-surface-500">{moodLabels[mood - 1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Energy */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Energy Level</label>
                    <div className="flex gap-2">
                      {([1, 2, 3, 4, 5] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setEntry({ ...entry, energy: level })}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                            entry.energy >= level ? 'bg-yellow-400 text-yellow-900' : 'bg-surface-100 dark:bg-surface-800 text-surface-400'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Today&apos;s Journal</label>
                    <textarea
                      value={entry.content}
                      onChange={(e) => setEntry({ ...entry, content: e.target.value })}
                      placeholder="Write about your day, thoughts, feelings..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                    />
                  </div>

                  {/* Gratitude */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      <Heart className="w-4 h-4 inline mr-1 text-pink-500" />
                      Gratitude (3 things)
                    </label>
                    <div className="space-y-2">
                      {entry.gratitude.map((g, i) => (
                        <input
                          key={i}
                          value={g}
                          onChange={(e) => {
                            const newGratitude = [...entry.gratitude]
                            newGratitude[i] = e.target.value
                            setEntry({ ...entry, gratitude: newGratitude })
                          }}
                          placeholder={`I'm grateful for...`}
                          className="w-full px-4 py-2 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Reflections */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Reflections</label>
                    <textarea
                      value={entry.reflections}
                      onChange={(e) => setEntry({ ...entry, reflections: e.target.value })}
                      placeholder="What did you learn? What would you do differently?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Tags</label>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="primary" size="sm">
                          {tag}
                          <button onClick={() => setEntry({ ...entry, tags: entry.tags.filter(t => t !== tag) })} className="ml-1">×</button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTag()}
                        placeholder="Add tag..."
                        className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                      />
                      <Button size="sm" variant="secondary" onClick={addTag}>Add</Button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave} className="flex-1">Save Entry</Button>
                    <Button variant="ghost" onClick={() => setIsWriting(false)}>Cancel</Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Prompts */}
            <div>
              <Card>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  Writing Prompts
                </h3>
                <div className="space-y-2">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setEntry({ ...entry, content: entry.content + (entry.content ? '\n\n' : '') + prompt + '\n' })}
                      className="w-full text-left text-xs p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="space-y-4">
            {journalEntries.length === 0 ? (
              <Card className="text-center py-12">
                <BookOpen className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">Start Your Journal</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
                  Reflect on your day, track your mood, and grow through self-awareness.
                </p>
                <Button onClick={() => setIsWriting(true)}>
                  <Plus className="w-4 h-4" /> Write First Entry
                </Button>
              </Card>
            ) : (
              journalEntries.slice().reverse().map((entry) => (
                <Card key={entry.id} hover>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                      <div>
                        <p className="text-sm font-medium text-surface-900 dark:text-white">
                          {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-surface-500">Energy: {entry.energy}/5</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-surface-700 dark:text-surface-300 whitespace-pre-wrap">{entry.content}</p>
                  {entry.gratitude.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-surface-100 dark:border-surface-800">
                      <p className="text-xs font-medium text-pink-500 mb-1">Grateful for:</p>
                      <ul className="text-xs text-surface-600 dark:text-surface-400 space-y-0.5">
                        {entry.gratitude.map((g, i) => (
                          <li key={i}>• {g}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
