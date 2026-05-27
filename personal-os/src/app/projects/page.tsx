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
  FolderKanban,
  Plus,
  Calendar,
  Clock,
  Trash2,
} from 'lucide-react'

export default function ProjectsPage() {
  const { projects, addProject, updateProject, deleteProject } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'planning' as const,
    priority: 'medium' as const,
    deadline: '',
  })

  const statusColors = {
    planning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    active: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    completed: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
    archived: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400',
  }

  const handleAdd = () => {
    if (!newProject.title) return
    addProject({ ...newProject, userId: '1' })
    setNewProject({ title: '', description: '', status: 'planning', priority: 'medium', deadline: '' })
    setShowModal(false)
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <FolderKanban className="w-7 h-7 text-purple-500" />
              Projects
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Manage your personal projects and track progress
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> New Project
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['planning', 'active', 'completed'] as const).map((status) => (
            <div key={status}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-surface-900 dark:text-white capitalize">{status}</h3>
                <Badge variant="outline">{projects.filter(p => p.status === status).length}</Badge>
              </div>
              <div className="space-y-3">
                {projects.filter(p => p.status === status).map((project) => (
                  <Card key={project.id} hover>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-surface-900 dark:text-white">{project.title}</h4>
                        <button onClick={() => deleteProject(project.id)} className="text-surface-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {project.description && (
                        <p className="text-xs text-surface-500 dark:text-surface-400">{project.description}</p>
                      )}
                      <ProgressBar value={project.progress} showLabel size="sm" />
                      <div className="flex items-center justify-between">
                        <Badge variant={project.priority === 'high' ? 'danger' : 'default'} size="sm">
                          {project.priority}
                        </Badge>
                        {project.deadline && (
                          <div className="flex items-center gap-1 text-xs text-surface-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      {status !== 'completed' && (
                        <div className="flex gap-2 pt-2">
                          {status === 'planning' && (
                            <Button size="sm" variant="secondary" onClick={() => updateProject(project.id, { status: 'active' })}>
                              Start
                            </Button>
                          )}
                          {status === 'active' && (
                            <Button size="sm" variant="accent" onClick={() => updateProject(project.id, { status: 'completed', progress: 100 })}>
                              Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Project Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Project" size="md">
          <div className="space-y-4">
            <Input
              label="Project Name"
              placeholder="e.g., AI SaaS Product"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <Input
              label="Description"
              placeholder="What's this project about?"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setNewProject({ ...newProject, priority: p })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      newProject.priority === p ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Deadline"
              type="date"
              value={newProject.deadline}
              onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
            />
            <Button onClick={handleAdd} className="w-full">
              <Plus className="w-4 h-4" /> Create Project
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
