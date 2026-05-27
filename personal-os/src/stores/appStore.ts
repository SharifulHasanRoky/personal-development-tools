import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  Habit, Goal, Skill, Task, JournalEntry, Transaction, 
  Project, Note, VisionItem, AIMessage, DailyStats, 
  Notification, Achievement, Widget 
} from '@/types'
import { generateId } from '@/lib/utils'

interface AppState {
  // Theme
  theme: 'light' | 'dark'
  accentColor: string
  sidebarCollapsed: boolean
  toggleTheme: () => void
  setAccentColor: (color: string) => void
  toggleSidebar: () => void

  // Habits
  habits: Habit[]
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'bestStreak' | 'completedToday' | 'completionHistory'>) => void
  toggleHabit: (id: string) => void
  deleteHabit: (id: string) => void

  // Goals
  goals: Goal[]
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'milestones'>) => void
  updateGoalProgress: (id: string, progress: number) => void
  deleteGoal: (id: string) => void

  // Skills
  skills: Skill[]
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'progressPercentage' | 'weaknesses'>) => void
  addSkillXp: (id: string, xp: number) => void
  deleteSkill: (id: string) => void

  // Tasks
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  deleteTask: (id: string) => void

  // Journal
  journalEntries: JournalEntry[]
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void

  // Finance
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void
  deleteTransaction: (id: string) => void

  // Projects
  projects: Project[]
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'tasks' | 'progress'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void

  // Notes
  notes: Note[]
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void

  // Vision Board
  visionItems: VisionItem[]
  addVisionItem: (item: Omit<VisionItem, 'id' | 'createdAt'>) => void
  deleteVisionItem: (id: string) => void

  // AI Messages
  aiMessages: AIMessage[]
  addAIMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void
  clearAIMessages: () => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void

  // Daily Stats
  dailyStats: DailyStats[]

  // Gamification
  totalXp: number
  achievements: Achievement[]
  addXp: (amount: number) => void
}

// Sample data for demo
const sampleHabits: Habit[] = [
  { id: '1', userId: '1', name: 'Wake up at 6 AM', description: 'Start day early', frequency: 'daily', category: 'routine', streak: 14, bestStreak: 21, xpReward: 20, completedToday: true, completionHistory: [], createdAt: '2024-01-01' },
  { id: '2', userId: '1', name: 'Workout', description: '30 min exercise', frequency: 'daily', category: 'health', streak: 7, bestStreak: 30, xpReward: 30, completedToday: false, completionHistory: [], createdAt: '2024-01-01' },
  { id: '3', userId: '1', name: 'Read 30 minutes', description: 'Read non-fiction', frequency: 'daily', category: 'growth', streak: 21, bestStreak: 45, xpReward: 25, completedToday: true, completionHistory: [], createdAt: '2024-01-01' },
  { id: '4', userId: '1', name: 'Meditation', description: '10 min mindfulness', frequency: 'daily', category: 'wellness', streak: 5, bestStreak: 15, xpReward: 15, completedToday: false, completionHistory: [], createdAt: '2024-01-01' },
  { id: '5', userId: '1', name: 'Learn Coding', description: '1 hour coding practice', frequency: 'daily', category: 'skill', streak: 30, bestStreak: 60, xpReward: 40, completedToday: true, completionHistory: [], createdAt: '2024-01-01' },
  { id: '6', userId: '1', name: 'No Social Media', description: 'Avoid mindless scrolling', frequency: 'daily', category: 'focus', streak: 3, bestStreak: 7, xpReward: 20, completedToday: false, completionHistory: [], createdAt: '2024-01-01' },
]

const sampleGoals: Goal[] = [
  { id: '1', userId: '1', title: 'Master AI Automation', description: 'Build 10 AI-powered projects', category: 'skill', priority: 'high', progress: 65, milestones: [{ id: '1', title: 'Complete AI course', completed: true }, { id: '2', title: 'Build first AI project', completed: true }, { id: '3', title: 'Launch SaaS product', completed: false }], targetDate: '2024-12-31', status: 'active', createdAt: '2024-01-01' },
  { id: '2', userId: '1', title: 'Save $10,000', description: 'Emergency fund goal', category: 'financial', priority: 'high', progress: 45, milestones: [], targetDate: '2024-12-31', status: 'active', createdAt: '2024-01-01' },
  { id: '3', userId: '1', title: 'Run a Marathon', description: 'Complete 42.2km race', category: 'health', priority: 'medium', progress: 30, milestones: [], targetDate: '2025-06-01', status: 'active', createdAt: '2024-01-01' },
]

const sampleSkills: Skill[] = [
  { id: '1', userId: '1', name: 'TypeScript/React', category: 'Coding', level: 8, xp: 2400, practiceHours: 320, progressPercentage: 80, weaknesses: ['Advanced patterns'], createdAt: '2024-01-01' },
  { id: '2', userId: '1', name: 'AI & Machine Learning', category: 'Technology', level: 5, xp: 1200, practiceHours: 150, progressPercentage: 50, weaknesses: ['Deep learning'], createdAt: '2024-01-01' },
  { id: '3', userId: '1', name: 'Video Editing', category: 'Creative', level: 4, xp: 800, practiceHours: 80, progressPercentage: 40, weaknesses: ['Color grading'], createdAt: '2024-01-01' },
  { id: '4', userId: '1', name: 'Public Speaking', category: 'Communication', level: 3, xp: 500, practiceHours: 40, progressPercentage: 30, weaknesses: ['Large audiences'], createdAt: '2024-01-01' },
  { id: '5', userId: '1', name: 'Business Strategy', category: 'Business', level: 6, xp: 1600, practiceHours: 200, progressPercentage: 60, weaknesses: ['Financial modeling'], createdAt: '2024-01-01' },
]

const sampleTasks: Task[] = [
  { id: '1', userId: '1', title: 'Review AI project documentation', priority: 'high', status: 'todo', dueDate: new Date().toISOString(), createdAt: '2024-01-01' },
  { id: '2', userId: '1', title: 'Deep work: Build API endpoints', priority: 'high', status: 'in-progress', dueDate: new Date().toISOString(), createdAt: '2024-01-01' },
  { id: '3', userId: '1', title: 'Weekly planning session', priority: 'medium', status: 'todo', dueDate: new Date().toISOString(), createdAt: '2024-01-01' },
  { id: '4', userId: '1', title: 'Update portfolio website', priority: 'low', status: 'todo', createdAt: '2024-01-01' },
]

const sampleTransactions: Transaction[] = [
  { id: '1', userId: '1', type: 'income', amount: 5000, category: 'Salary', description: 'Monthly salary', date: '2024-03-01', createdAt: '2024-03-01' },
  { id: '2', userId: '1', type: 'expense', amount: 1200, category: 'Rent', description: 'Monthly rent', date: '2024-03-02', createdAt: '2024-03-02' },
  { id: '3', userId: '1', type: 'expense', amount: 200, category: 'Food', description: 'Groceries', date: '2024-03-05', createdAt: '2024-03-05' },
  { id: '4', userId: '1', type: 'expense', amount: 50, category: 'Education', description: 'Online course', date: '2024-03-10', createdAt: '2024-03-10' },
  { id: '5', userId: '1', type: 'income', amount: 800, category: 'Freelance', description: 'Client project', date: '2024-03-15', createdAt: '2024-03-15' },
]

const sampleDailyStats: DailyStats[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
  productivityScore: Math.floor(Math.random() * 40) + 60,
  focusScore: Math.floor(Math.random() * 40) + 55,
  moodScore: Math.floor(Math.random() * 3) + 3,
  energyLevel: Math.floor(Math.random() * 3) + 3,
  habitsCompleted: Math.floor(Math.random() * 4) + 2,
  totalHabits: 6,
  tasksCompleted: Math.floor(Math.random() * 5) + 1,
  skillPracticeHours: Math.floor(Math.random() * 3) + 1,
}))

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      accentColor: 'indigo',
      sidebarCollapsed: false,
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setAccentColor: (color) => set({ accentColor: color }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Habits
      habits: sampleHabits,
      addHabit: (habit) => set((state) => ({
        habits: [...state.habits, { ...habit, id: generateId(), streak: 0, bestStreak: 0, completedToday: false, completionHistory: [], createdAt: new Date().toISOString() }]
      })),
      toggleHabit: (id) => set((state) => ({
        habits: state.habits.map(h => h.id === id ? { ...h, completedToday: !h.completedToday, streak: !h.completedToday ? h.streak + 1 : h.streak - 1 } : h)
      })),
      deleteHabit: (id) => set((state) => ({ habits: state.habits.filter(h => h.id !== id) })),

      // Goals
      goals: sampleGoals,
      addGoal: (goal) => set((state) => ({
        goals: [...state.goals, { ...goal, id: generateId(), milestones: [], createdAt: new Date().toISOString() }]
      })),
      updateGoalProgress: (id, progress) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, progress, status: progress >= 100 ? 'completed' : g.status } : g)
      })),
      deleteGoal: (id) => set((state) => ({ goals: state.goals.filter(g => g.id !== id) })),

      // Skills
      skills: sampleSkills,
      addSkill: (skill) => set((state) => ({
        skills: [...state.skills, { ...skill, id: generateId(), progressPercentage: 0, weaknesses: [], createdAt: new Date().toISOString() }]
      })),
      addSkillXp: (id, xp) => set((state) => ({
        skills: state.skills.map(s => s.id === id ? { ...s, xp: s.xp + xp } : s)
      })),
      deleteSkill: (id) => set((state) => ({ skills: state.skills.filter(s => s.id !== id) })),

      // Tasks
      tasks: sampleTasks,
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: generateId(), createdAt: new Date().toISOString() }]
      })),
      updateTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
      })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),

      // Journal
      journalEntries: [],
      addJournalEntry: (entry) => set((state) => ({
        journalEntries: [...state.journalEntries, { ...entry, id: generateId(), createdAt: new Date().toISOString() }]
      })),

      // Finance
      transactions: sampleTransactions,
      addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, { ...transaction, id: generateId(), createdAt: new Date().toISOString() }]
      })),
      deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) })),

      // Projects
      projects: [
        { id: '1', userId: '1', title: 'Personal OS', description: 'Build the ultimate life dashboard', status: 'active', priority: 'high', tasks: [], progress: 35, deadline: '2024-06-01', createdAt: '2024-01-01' },
        { id: '2', userId: '1', title: 'AI SaaS Product', description: 'Launch AI automation tool', status: 'planning', priority: 'high', tasks: [], progress: 15, deadline: '2024-09-01', createdAt: '2024-02-01' },
      ],
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: generateId(), tasks: [], progress: 0, createdAt: new Date().toISOString() }]
      })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

      // Notes
      notes: [],
      addNote: (note) => set((state) => ({
        notes: [...state.notes, { ...note, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
      })),
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n)
      })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) })),

      // Vision Board
      visionItems: [],
      addVisionItem: (item) => set((state) => ({
        visionItems: [...state.visionItems, { ...item, id: generateId(), createdAt: new Date().toISOString() }]
      })),
      deleteVisionItem: (id) => set((state) => ({ visionItems: state.visionItems.filter(v => v.id !== id) })),

      // AI Messages
      aiMessages: [],
      addAIMessage: (message) => set((state) => ({
        aiMessages: [...state.aiMessages, { ...message, id: generateId(), timestamp: new Date().toISOString() }]
      })),
      clearAIMessages: () => set({ aiMessages: [] }),

      // Notifications
      notifications: [
        { id: '1', type: 'achievement', title: 'New Achievement!', message: 'You completed a 7-day workout streak!', read: false, createdAt: new Date().toISOString() },
        { id: '2', type: 'ai', title: 'AI Insight', message: 'Your focus score improved 15% this week. Keep it up!', read: false, createdAt: new Date().toISOString() },
        { id: '3', type: 'reminder', title: 'Habit Reminder', message: "Don't forget your evening meditation", read: true, createdAt: new Date().toISOString() },
      ],
      addNotification: (notification) => set((state) => ({
        notifications: [{ ...notification, id: generateId(), read: false, createdAt: new Date().toISOString() }, ...state.notifications]
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      clearNotifications: () => set({ notifications: [] }),

      // Daily Stats
      dailyStats: sampleDailyStats,

      // Gamification
      totalXp: 2450,
      achievements: [
        { id: '1', title: 'Early Bird', description: 'Wake up before 6 AM for 7 days', icon: '🌅', unlockedAt: '2024-02-15', requirement: '7 day streak', progress: 7, maxProgress: 7 },
        { id: '2', title: 'Code Warrior', description: 'Practice coding for 30 consecutive days', icon: '⚔️', unlockedAt: '2024-03-01', requirement: '30 day streak', progress: 30, maxProgress: 30 },
        { id: '3', title: 'Book Worm', description: 'Read for 21 consecutive days', icon: '📚', requirement: '21 day streak', progress: 21, maxProgress: 21, unlockedAt: '2024-02-20' },
        { id: '4', title: 'Marathon Runner', description: 'Complete 100 tasks', icon: '🏃', requirement: '100 tasks', progress: 67, maxProgress: 100 },
        { id: '5', title: 'Zen Master', description: 'Meditate for 30 consecutive days', icon: '🧘', requirement: '30 day streak', progress: 5, maxProgress: 30 },
      ],
      addXp: (amount) => set((state) => ({ totalXp: state.totalXp + amount })),
    }),
    {
      name: 'personal-os-data',
      partialize: (state) => ({
        theme: state.theme,
        accentColor: state.accentColor,
        sidebarCollapsed: state.sidebarCollapsed,
        habits: state.habits,
        goals: state.goals,
        skills: state.skills,
        tasks: state.tasks,
        journalEntries: state.journalEntries,
        transactions: state.transactions,
        projects: state.projects,
        notes: state.notes,
        visionItems: state.visionItems,
        totalXp: state.totalXp,
        achievements: state.achievements,
      }),
    }
  )
)
