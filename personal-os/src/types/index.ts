// User & Auth Types
export interface User {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  level: number
  xp: number
  createdAt: string
}

// Habit Types
export interface Habit {
  id: string
  userId: string
  name: string
  description?: string
  frequency: 'daily' | 'weekly' | 'monthly'
  category: string
  streak: number
  bestStreak: number
  xpReward: number
  completedToday: boolean
  completionHistory: string[]
  createdAt: string
}

// Goal Types
export interface Goal {
  id: string
  userId: string
  title: string
  description?: string
  category: 'short-term' | 'long-term' | 'financial' | 'skill' | 'health'
  priority: 'low' | 'medium' | 'high' | 'critical'
  progress: number
  milestones: Milestone[]
  targetDate?: string
  status: 'active' | 'completed' | 'paused' | 'abandoned'
  createdAt: string
}

export interface Milestone {
  id: string
  title: string
  completed: boolean
  completedAt?: string
}

// Skill Types
export interface Skill {
  id: string
  userId: string
  name: string
  category: string
  level: number
  xp: number
  practiceHours: number
  progressPercentage: number
  weaknesses: string[]
  createdAt: string
}

// Task Types
export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in-progress' | 'completed'
  dueDate?: string
  timeBlock?: { start: string; end: string }
  projectId?: string
  createdAt: string
}

// Journal Types
export interface JournalEntry {
  id: string
  userId: string
  date: string
  content: string
  mood: 1 | 2 | 3 | 4 | 5
  energy: 1 | 2 | 3 | 4 | 5
  gratitude: string[]
  reflections: string
  tags: string[]
  createdAt: string
}

// Finance Types
export interface Transaction {
  id: string
  userId: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
  createdAt: string
}

export interface Budget {
  id: string
  userId: string
  category: string
  limit: number
  spent: number
  period: 'monthly' | 'weekly'
}

// Project Types
export interface Project {
  id: string
  userId: string
  title: string
  description?: string
  status: 'planning' | 'active' | 'completed' | 'archived'
  priority: 'low' | 'medium' | 'high'
  tasks: Task[]
  progress: number
  deadline?: string
  createdAt: string
}

// Note Types
export interface Note {
  id: string
  userId: string
  title: string
  content: string
  category: string
  tags: string[]
  linkedNotes: string[]
  createdAt: string
  updatedAt: string
}

// Vision Board Types
export interface VisionItem {
  id: string
  userId: string
  title: string
  description?: string
  imageUrl?: string
  category: string
  createdAt: string
}

// AI Types
export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AIRecommendation {
  id: string
  type: 'habit' | 'goal' | 'skill' | 'wellness' | 'productivity'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

// Analytics Types
export interface DailyStats {
  date: string
  productivityScore: number
  focusScore: number
  moodScore: number
  energyLevel: number
  habitsCompleted: number
  totalHabits: number
  tasksCompleted: number
  skillPracticeHours: number
}

// Widget Types
export interface Widget {
  id: string
  type: string
  title: string
  visible: boolean
  position: { x: number; y: number }
  size: { w: number; h: number }
}

// Notification Types
export interface Notification {
  id: string
  type: 'reminder' | 'achievement' | 'warning' | 'info' | 'ai'
  title: string
  message: string
  read: boolean
  createdAt: string
}

// Gamification Types
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  requirement: string
  progress: number
  maxProgress: number
}
