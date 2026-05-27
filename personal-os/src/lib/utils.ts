import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function calculateLevel(xp: number): { level: number; currentXp: number; nextLevelXp: number } {
  const baseXp = 100
  const multiplier = 1.5
  let level = 1
  let totalXpNeeded = baseXp

  while (xp >= totalXpNeeded) {
    level++
    totalXpNeeded += Math.floor(baseXp * Math.pow(multiplier, level - 1))
  }

  const previousLevelXp = totalXpNeeded - Math.floor(baseXp * Math.pow(multiplier, level - 1))
  const currentXp = xp - previousLevelXp
  const nextLevelXp = Math.floor(baseXp * Math.pow(multiplier, level - 1))

  return { level, currentXp, nextLevelXp }
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 80) return 'text-green-500'
  if (percentage >= 50) return 'text-yellow-500'
  if (percentage >= 25) return 'text-orange-500'
  return 'text-red-500'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
