'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Database, BookOpen, Lightbulb, FileText, Quote, Rocket, Brain, Search } from 'lucide-react'

const vaultCategories = [
  { icon: '💡', name: 'Ideas', count: 12, color: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { icon: '📚', name: 'Lessons Learned', count: 8, color: 'bg-blue-100 dark:bg-blue-900/30' },
  { icon: '🎯', name: 'Strategies', count: 5, color: 'bg-green-100 dark:bg-green-900/30' },
  { icon: '💬', name: 'Quotes', count: 20, color: 'bg-purple-100 dark:bg-purple-900/30' },
  { icon: '🔬', name: 'Research', count: 7, color: 'bg-pink-100 dark:bg-pink-900/30' },
  { icon: '🚀', name: 'Business Plans', count: 3, color: 'bg-orange-100 dark:bg-orange-900/30' },
  { icon: '⚡', name: 'AI Prompts', count: 15, color: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { icon: '🌟', name: 'Inspirations', count: 10, color: 'bg-rose-100 dark:bg-rose-900/30' },
]

const recentItems = [
  { title: 'Building a Second Brain - Key Takeaways', category: 'Lessons Learned', date: '2 days ago' },
  { title: 'AI Business Ideas for 2024', category: 'Ideas', date: '3 days ago' },
  { title: 'The 80/20 Principle in Learning', category: 'Strategies', date: '1 week ago' },
  { title: '"The best time to start was yesterday..."', category: 'Quotes', date: '1 week ago' },
  { title: 'Prompt Engineering Best Practices', category: 'AI Prompts', date: '2 weeks ago' },
]

export default function KnowledgeVaultPage() {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <Database className="w-7 h-7 text-purple-500" />
              Knowledge Vault
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Your second brain - store, connect, and retrieve knowledge
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="AI-powered search..."
                className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 w-56"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vaultCategories.map((cat) => (
            <Card key={cat.name} hover className="cursor-pointer text-center">
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                <span className="text-2xl">{cat.icon}</span>
              </div>
              <h3 className="font-medium text-surface-900 dark:text-white text-sm">{cat.name}</h3>
              <p className="text-xs text-surface-500 mt-1">{cat.count} items</p>
            </Card>
          ))}
        </div>

        {/* Recent Items */}
        <Card>
          <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Recent Entries</h3>
          <div className="space-y-3">
            {recentItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" size="sm">{item.category}</Badge>
                    <span className="text-xs text-surface-500">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Feature */}
        <Card variant="glass" className="border-purple-200/50 dark:border-purple-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-white">AI-Powered Knowledge</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Your vault automatically connects related notes, suggests insights, and helps you retrieve knowledge using natural language.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}
