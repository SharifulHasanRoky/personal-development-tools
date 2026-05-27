'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import {
  FileText,
  Plus,
  Search,
  Tag,
  Trash2,
  Edit3,
  Clock,
} from 'lucide-react'

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'General', tags: [] as string[], linkedNotes: [] as string[], userId: '1' })
  const [tagInput, setTagInput] = useState('')

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSave = () => {
    if (!newNote.title) return
    if (selectedNote) {
      updateNote(selectedNote, newNote)
    } else {
      addNote(newNote)
    }
    setNewNote({ title: '', content: '', category: 'General', tags: [], linkedNotes: [], userId: '1' })
    setSelectedNote(null)
    setShowModal(false)
  }

  const handleEdit = (note: typeof notes[0]) => {
    setNewNote({ title: note.title, content: note.content, category: note.category, tags: note.tags, linkedNotes: note.linkedNotes, userId: '1' })
    setSelectedNote(note.id)
    setShowModal(true)
  }

  const addTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote({ ...newNote, tags: [...newNote.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const categories = ['General', 'Ideas', 'Work', 'Learning', 'Research', 'Personal']

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <FileText className="w-7 h-7 text-blue-500" />
              Notes
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Capture ideas, thoughts, and knowledge
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 w-48"
              />
            </div>
            <Button onClick={() => { setSelectedNote(null); setNewNote({ title: '', content: '', category: 'General', tags: [], linkedNotes: [], userId: '1' }); setShowModal(true) }}>
              <Plus className="w-4 h-4" /> New Note
            </Button>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <Card className="text-center py-12">
            <FileText className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
              {notes.length === 0 ? 'No Notes Yet' : 'No Matching Notes'}
            </h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
              {notes.length === 0 ? 'Start capturing your thoughts and ideas.' : 'Try a different search term.'}
            </p>
            {notes.length === 0 && (
              <Button onClick={() => setShowModal(true)}>
                <Plus className="w-4 h-4" /> Create First Note
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card key={note.id} hover className="cursor-pointer" onClick={() => handleEdit(note)}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-surface-900 dark:text-white truncate flex-1">{note.title}</h3>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                      className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-3">{note.content}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-100 dark:border-surface-800">
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="outline" size="sm">{note.category}</Badge>
                      {note.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="primary" size="sm">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-surface-400">
                      <Clock className="w-3 h-3" />
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Note Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedNote ? 'Edit Note' : 'New Note'} size="lg">
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Content</label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="Write your note..."
                rows={8}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewNote({ ...newNote, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      newNote.category === cat ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Tags</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {newNote.tags.map((tag) => (
                  <Badge key={tag} variant="primary" size="sm">
                    {tag}
                    <button onClick={() => setNewNote({ ...newNote, tags: newNote.tags.filter(t => t !== tag) })} className="ml-1">×</button>
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
            <Button onClick={handleSave} className="w-full">
              {selectedNote ? 'Update Note' : 'Save Note'}
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
